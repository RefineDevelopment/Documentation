
# Product Documentation Creation

Please read and follow each section in order to correctly create the section for a product.

Your pull request will not be merged unless the template is followed properly.

## Getting Started

1. Copy the `Template` directory and rename it to your product name.
2. Rename the `Template.mdx` file to match your product name aswell.

### Links

Links must be formatted according to the following table:

`{}` = Optional

Type                         | Format
---------------------------- | -----------------------------------------------------------------------
Internal (Same Product)      | `[Directory/File{/Heading>}](/Product/Directory/File{#heading})`
Internal (Different Product) | `[Product/Directory/File{/Heading>}](/Product/Directory/File{#heading})`
External                     | `[any text](https://any.link/)`

If this is confusing, look around the files for an example or ask for help in discord.

### Tabs

If you have tabs with a lot of content in them, it is recommended to do the following:

1. Create a folder in the same directory as your file, eg: `fruits/`.
2. For each tab item, create a file following this format `_<item>.mdx`, eg: `_apple.mdx`.
3. Fill those files out with the contents of your tab items.
4. Import each file in your page and add them in the `TabItem` component.

An example of this can be found in `Installation.mdx`.

### Assets

If you want to add images, videos or other assets into a page:

1. Create a assets folder in the same directory as your page.
2. Move your asset into the folder and import it in your page.
3. If your asset shows up on the sidebar, add a _ to the start of its name.

An example of this can be found in the `Features` directory.

## Introduction

Open `Introduction.mdx` and customize the following:

1. Create and update the product's long description.
2. Add FAQs by copy-pasting the template at the bottom.

### Installation

- Update `installation/_<platform>.mdx` with info on how to install your product.
- If you want to add or remove a platform, add/remove the import and TabItem in `Intoduction.mdx`, 
- and then create a `installation/_<platform>.mdx` file with instructions on how to install your product.

## Features & Addons

Each page should be placed in the `Features`/`Addons` folder. They should also have this at the top:

```yml
---
sidebar_position: 1 # Set the position of your features, starting from 1.
#title: Example Feature/Addon # If your feature has spaces in it, set the title and rename the file to have no spaces.
---
```

Your page should follow the layout of the pages found in the `Features`/`Addons` folder.

## Permissions

The permissions file contains all of your product's permissions, all features and addons.

- Open `Permissions.mdx` and follow the comments in the file.
- Once finished, remove the comments.

## Placeholders

The `Placeholders.mdx` file contains all of your product's placeholders, internal and PlaceholderAPI.

## Commands

Your commands will be listed at the bottom of each feature page.

The documentation doesn't require all commands to be listed, if you still want to list all commands:

1. Make a `Commands.mdx` file and copy the layout of `Permissions.mdx`.
2. Change the table to the tables found at the bottom the example feature pages.