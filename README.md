# Block Explorer v.2

This repo is the website for the Iron Fish Block Explorer version 2. The first version of the Block Explorer can be found in iron-fish/block-explorer

This is a Next.js project bootstrapped with `create-next-app`.

## Getting Started

Create an `.env.local` file. You can copy the existing template (`cp .env.template .env.local`)

```
NEXT_PUBLIC_API_URL=https://api.ironfish.network
```

Then, run the development server:

`npm run dev`
_or_
`yarn dev`

Open http://localhost:3000 with your browser to see the result.

## Development

_Optional_  - Run `npx husky install` in order to set up your git hooks locally.

## Scripts

    Add `nps` using either `yarn global add nps` or `npm i nps -g`
    Run `nps` for a list of scripts to run in the repo.

## Commit Hooks

By default we run a precommit hook which runs nps care. If needed, you can avoid this hook by adding a --no-verify flag, e.g. `git commit -m "cool" --no-verify`

## Alternate Port

Run `npm run dev -- -p 4040` or `yarn dev -p 4040` to run the server locally on a different port than 3000 (the default)

## Review Process

1. New PRs should point at `staging`.
2. When we want to do a release to production, we should open a PR to merge `staging` into `master`.
   - For these PRs, please add a [Needs Design Review Label](https://github.com/iron-fish/block-explorer-v2/labels/%F0%9F%94%8D%20Needs%20Design%20Review) and tag `@skylarrichard123` for review.
3. Once the release branch has been reviewed, either:
   a. There are fixes needed - open new PRs and point them at the release branch
   b. There are no fixes needed - Remove the *Needs Design Review* label and add the [Designer Approved Label](https://github.com/iron-fish/block-explorer-v2/labels/%E2%9C%94%EF%B8%8FDesigner%20Approved)

