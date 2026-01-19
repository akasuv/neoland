/**
 * Sync Plugins Script
 *
 * Fetches plugin data from awesome-neovim README.md and syncs to Supabase.
 *
 * Usage:
 *   pnpm run sync-plugins
 *   # or
 *   npx tsx scripts/sync-plugins.ts
 *
 * Environment variables required:
 *   NEXT_PUBLIC_SUPABASE_URL - Supabase project URL
 *   SUPABASE_SECRET_KEY - Secret key for write access
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env
config({ path: ".env" });

const README_URL =
  "https://raw.githubusercontent.com/rockerBOO/awesome-neovim/main/README.md";

// Categories to skip (not actual plugin categories)
const SKIP_CATEGORIES = new Set([
  "Contents",
  "Wishlist",
  "Contributing",
  "License",
]);

// Interface definitions
interface Plugin {
  name: string;
  full_name: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
}

interface Category {
  name: string;
  slug: string;
  parent_id: string | null;
  plugin_count: number;
}

/**
 * Convert a category name to a URL-friendly slug
 */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Parse a plugin entry from markdown
 * Format: - [username/repo-name](github-url) - Description.
 */
function parsePluginLine(
  line: string,
  category: string,
  tags: string[]
): Plugin | null {
  // Match: - [name](url) - description
  // Also handle cases where description might have nested links
  const regex = /^-\s+\[([^\]]+)\]\(([^)]+)\)\s+-\s+(.+)$/;
  const match = line.match(regex);

  if (!match) {
    return null;
  }

  const [, fullName, link, description] = match;

  // Extract repo name from full_name (e.g., "nvim-treesitter" from "nvim-treesitter/nvim-treesitter")
  const name = fullName.includes("/") ? fullName.split("/")[1] : fullName;

  // Clean description - remove trailing special markers like [TS], [LSP], etc.
  const cleanDescription = description
    .replace(/\s*\[(?:TS|LSP|L\/D|Treesitter)\]\s*/g, " ")
    .trim();

  return {
    name,
    full_name: fullName,
    description: cleanDescription,
    link,
    category,
    tags,
  };
}

/**
 * Parse the README markdown and extract categories and plugins
 */
function parseReadme(markdown: string): {
  plugins: Plugin[];
  categories: Map<string, Category>;
} {
  const lines = markdown.split("\n");
  const plugins: Plugin[] = [];
  const categories = new Map<string, Category>();

  let currentCategory = "";
  let currentSubCategory = "";
  let currentCategorySlug = "";
  let currentSubCategorySlug = "";

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Match main category (##)
    const categoryMatch = trimmedLine.match(/^##\s+(.+)$/);
    if (categoryMatch) {
      const categoryName = categoryMatch[1].trim();

      // Skip non-plugin categories
      if (SKIP_CATEGORIES.has(categoryName)) {
        currentCategory = "";
        continue;
      }

      currentCategory = categoryName;
      currentSubCategory = "";
      currentCategorySlug = toSlug(categoryName);
      currentSubCategorySlug = "";

      // Add to categories if not exists
      if (!categories.has(currentCategorySlug)) {
        categories.set(currentCategorySlug, {
          name: categoryName,
          slug: currentCategorySlug,
          parent_id: null,
          plugin_count: 0,
        });
      }
      continue;
    }

    // Match sub-category (###)
    const subCategoryMatch = trimmedLine.match(/^###\s+(.+)$/);
    if (subCategoryMatch && currentCategory) {
      const subCategoryName = subCategoryMatch[1].trim();
      currentSubCategory = subCategoryName;
      currentSubCategorySlug = toSlug(subCategoryName);

      // Add sub-category
      const fullSlug = `${currentCategorySlug}/${currentSubCategorySlug}`;
      if (!categories.has(fullSlug)) {
        categories.set(fullSlug, {
          name: subCategoryName,
          slug: fullSlug,
          parent_id: currentCategorySlug,
          plugin_count: 0,
        });
      }
      continue;
    }

    // Match plugin entry
    if (currentCategory && trimmedLine.startsWith("- [")) {
      // Build tags array
      const tags: string[] = [currentCategory];
      if (currentSubCategory) {
        tags.push(currentSubCategory);
      }

      // Determine the most specific category for the plugin
      const pluginCategory = currentSubCategory || currentCategory;
      const categorySlugForCount = currentSubCategory
        ? `${currentCategorySlug}/${currentSubCategorySlug}`
        : currentCategorySlug;

      const plugin = parsePluginLine(trimmedLine, pluginCategory, tags);
      if (plugin) {
        plugins.push(plugin);

        // Update plugin count
        const cat = categories.get(categorySlugForCount);
        if (cat) {
          cat.plugin_count++;
        }

        // Also update parent category count if sub-category
        if (currentSubCategory) {
          const parentCat = categories.get(currentCategorySlug);
          if (parentCat) {
            parentCat.plugin_count++;
          }
        }
      }
    }
  }

  return { plugins, categories };
}

/**
 * Main sync function
 */
async function syncPlugins() {
  console.log("Starting plugin sync...\n");

  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    console.error("Error: Missing required environment variables.");
    console.error("Please set:");
    console.error("  - NEXT_PUBLIC_SUPABASE_URL");
    console.error("  - SUPABASE_SECRET_KEY");
    process.exit(1);
  }

  // Create Supabase client with secret key for write access
  const supabase = createClient(supabaseUrl, supabaseSecretKey);

  // Fetch README
  console.log("Fetching awesome-neovim README.md...");
  const response = await fetch(README_URL);
  if (!response.ok) {
    console.error(`Failed to fetch README: ${response.status}`);
    process.exit(1);
  }
  const markdown = await response.text();
  console.log(`Fetched ${markdown.length} bytes\n`);

  // Parse README
  console.log("Parsing markdown...");
  const { plugins, categories } = parseReadme(markdown);
  console.log(`Found ${plugins.length} plugins`);
  console.log(`Found ${categories.size} categories\n`);

  // Clear existing data
  console.log("Clearing existing data...");

  const { error: deletePluginsError } = await supabase
    .from("plugins")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all rows

  if (deletePluginsError) {
    console.error("Error clearing plugins:", deletePluginsError.message);
    process.exit(1);
  }

  const { error: deleteCategoriesError } = await supabase
    .from("categories")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all rows

  if (deleteCategoriesError) {
    console.error("Error clearing categories:", deleteCategoriesError.message);
    process.exit(1);
  }
  console.log("Cleared existing data\n");

  // Insert categories first (need to handle parent references)
  console.log("Inserting categories...");

  // First pass: insert all categories without parent_id
  const categoryArray = Array.from(categories.values());
  const categoriesWithoutParent = categoryArray.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    plugin_count: cat.plugin_count,
  }));

  const { data: insertedCategories, error: insertCategoriesError } =
    await supabase.from("categories").insert(categoriesWithoutParent).select();

  if (insertCategoriesError) {
    console.error("Error inserting categories:", insertCategoriesError.message);
    process.exit(1);
  }

  // Build slug to id mapping
  const slugToId = new Map<string, string>();
  for (const cat of insertedCategories || []) {
    slugToId.set(cat.slug, cat.id);
  }

  // Second pass: update parent_id for sub-categories
  for (const cat of categoryArray) {
    if (cat.parent_id) {
      const categoryId = slugToId.get(cat.slug);
      const parentId = slugToId.get(cat.parent_id);

      if (categoryId && parentId) {
        const { error: updateError } = await supabase
          .from("categories")
          .update({ parent_id: parentId })
          .eq("id", categoryId);

        if (updateError) {
          console.error(
            `Error updating parent for ${cat.slug}:`,
            updateError.message
          );
        }
      }
    }
  }
  console.log(`Inserted ${insertedCategories?.length || 0} categories\n`);

  // Insert plugins in batches
  console.log("Inserting plugins...");
  const BATCH_SIZE = 100;
  let insertedCount = 0;

  for (let i = 0; i < plugins.length; i += BATCH_SIZE) {
    const batch = plugins.slice(i, i + BATCH_SIZE);
    const { error: insertPluginsError } = await supabase
      .from("plugins")
      .insert(batch);

    if (insertPluginsError) {
      console.error(
        `Error inserting plugins batch ${i}:`,
        insertPluginsError.message
      );
      // Continue with next batch instead of exiting
      continue;
    }
    insertedCount += batch.length;
    process.stdout.write(`\rInserted ${insertedCount}/${plugins.length} plugins`);
  }
  console.log("\n");

  // Summary
  console.log("=".repeat(50));
  console.log("Sync completed successfully!");
  console.log(`  - Categories: ${categories.size}`);
  console.log(`  - Plugins: ${insertedCount}`);
  console.log("=".repeat(50));
}

// Run the sync
syncPlugins().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
