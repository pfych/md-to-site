---
title: base-files.ts
---

This function moves the "base" files required into the build directory. It ensures that directories exist before any other build scripts run.

If you want to add extra files into your build folder you can add them to the `baseFiles` array:

```typescript
const baseFiles: { filename?: string; from?: string; to: string }[] = [
  { filename: 'favicon.ico', from: 'templates', to: 'build' },
];
```
