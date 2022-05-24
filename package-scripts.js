// eslint-disable-next-line @typescript-eslint/no-var-requires
const { rimraf, concurrent } = require('nps-utils')
const PORT = process.env.PORT || 5000

const folders = ['components', 'hooks', 'public', 'styles', 'svg', 'utils']

module.exports = {
  scripts: {
    dev: {
      custom: `nps 'dev -p ${PORT}`,
      script: 'next dev',
    },
    bureaucracy: {
      description: 'Automatically fix some pain points',
      script: 'nps bureaucracy.enforceStaticVersions',
      enforceStaticVersions: `node scripts/force-static-versions.js`,
    },
    lint: {
      description: 'lint and keep things DRY',
      script: concurrent.nps('lint.core', 'lint.dry'),
      core: 'eslint --fix .',
      dry: 'twly --boring --lines 5 -t .trc',
    },
    meta: {
      description: 'build a reference image of the codebase',
      script: 'nps meta.dep',
      log: `gitparty`,
      dependencies: {
        build: `depcruise -c .dependency-cruiser.js -T dot ${folders.join(
          ' '
        )} --progress -x node_modules | dot -T svg > dependency-graph.svg`,
        interactive: `cat dependency-graph.svg | depcruise-wrap-stream-in-html > dependency-graph.html`,
        script: 'nps meta.dep.build meta.dep.interactive',
      },
    },
    build: {
      description: 'build the codebase with tsc',
      clean: rimraf('dist'),
      tsc: 'tsc --project tsconfig.json',
      script: 'nps build.clean build.tsc',
    },
    test: {
      description: 'test things',
      script: 'jest',
      watch: 'nps "test --watch"',
      snapshot: 'nps "test -u"',
    },
    publish: 'npm publish',
    precommit: 'nps care',
    care: concurrent.nps('build', 'lint'),
    dx: concurrent.nps('lint', 'bureaucracy', 'meta'),
  },
}
