import { defineConfig } from "cz-git";

export default defineConfig({
    maxSubjectLength: 100,
    allowBreakingChanges: ["feat", "fix"],
});
