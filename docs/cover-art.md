# Original cover artwork

All 20 fictional demo stories have original artwork generated with the built-in `image_gen.imagegen` tool. No commercial book covers or Apple assets were used.

The final assets are project-local JPEGs in `assets/covers/`, registered statically by `src/data/cover-assets.ts`. Each has a consistent portrait ratio; the app adds the title and author as live text. Files are resized to a 900-pixel maximum edge to keep the catalog compact. Covers were visually inspected after generation.

The complete final prompt set and exact per-asset paths are recorded in [cover-prompts.json](cover-prompts.json). These are demonstration assets, not an assertion about rights clearance for a future production catalog.
