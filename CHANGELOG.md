# @ctx-core/monorepo

## 11.3.4

### Patch Changes

- pnpm-publish--force: back to 8 threads

## 11.3.3

### Patch Changes

- pnpm-publish--force: 16 parallel threads

## 11.3.2

### Patch Changes

- @ctx-core/array@19.0.4
- @ctx-core/cli-args@6.0.4
- @ctx-core/package@5.0.4

## 11.3.1

### Patch Changes

- fix: pnpm-publish--force: issue with error message being printed from npm show command on private repo

## 11.3.0

### Minor Changes

- feat: pnpm-publish--force: parallel --eta: progress indicator
  fix: pnpm-publish--force: issue skipping latest package

## 11.2.2

### Patch Changes

- Updated dependencies [undefined]
  - @ctx-core/queue@2.0.2

## 11.2.1

### Patch Changes

- @ctx-core/array@19.0.3
- @ctx-core/cli-args@6.0.3
- @ctx-core/package@5.0.3

## 11.2.0

### Minor Changes

- feat: pnpm-publish--all: flags

      -d dry run
      -h help

## 11.1.7

### Patch Changes

- fix: pnpm-publish--force.sh: ignoring packages at the latest version on npm

## 11.1.6

### Patch Changes

- fix: pnpm-publish--force.sh: error in conditional

## 11.1.5

### Patch Changes

- pnpm-publish--force.sh: do not attempt ot publish package if local version matches with npm repository version

## 11.1.4

### Patch Changes

- fix: install issues: using explicit workspace: versioning
- Updated dependencies [undefined]
  - @ctx-core/array@19.0.2
  - @ctx-core/cli-args@6.0.2
  - @ctx-core/package@5.0.2

## 11.1.3

### Patch Changes

- Updated dependencies [undefined]
  - @ctx-core/queue@2.0.1

## 11.1.2

### Patch Changes

- @ctx-core/array@19.0.1
- @ctx-core/cli-args@6.0.1
- @ctx-core/package@5.0.1

## 11.1.1

### Patch Changes

- output progress using ora

## 11.1.0

### Minor Changes

- - pnpn-publish--force: uses pnpm pbulish. npm-publish--force delegates to pnpm-publish--force

## 11.0.0

### Major Changes

- Typescript strict checking

### Minor Changes

- - pwd--packages, tsc-clean--packages

### Patch Changes

- Updated dependencies [undefined]
  - @ctx-core/array@19.0.0
  - @ctx-core/cli-args@6.0.0
  - @ctx-core/package@5.0.0
  - @ctx-core/queue@2.0.0

## 10.0.3

### Patch Changes

- fix: npm run compile: path to tsc
- Updated dependencies [undefined]
  - @ctx-core/array@18.0.1
  - @ctx-core/cli-args@5.0.1
  - @ctx-core/package@4.0.1
  - @ctx-core/queue@1.3.5

## 10.0.2

### Patch Changes

- fix: npm-publish--force.sh: running script

## 10.0.1

### Patch Changes

- Updated dependencies [undefined]
- Updated dependencies [undefined]
  - @ctx-core/array@18.0.0
  - @ctx-core/cli-args@5.0.0
  - @ctx-core/package@4.0.0

## 10.0.0

### Major Changes

- 24c4f538f: Targeting @microsoft/rush instead of yarn workspaces & lerna
