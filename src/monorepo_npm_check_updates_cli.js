import { _param_h } from '@ctx-core/cli-args';
import { monorepo_npm_check_updates } from './monorepo_npm_check_updates';
export async function monorepo_npm_check_updates_cli() {
    const param_h = _param_h(process.argv.slice(2), {
        threads: '-t, --threads',
        workspace_name: '-w, --workspace-name'
    }, {
        threads: 20,
    });
    const stdout_h_package_name = await monorepo_npm_check_updates(param_h);
    for (let package_name in stdout_h_package_name) {
        const stdout = stdout_h_package_name[package_name];
        if (stdout) {
            stdout.split('\n').forEach(stdout_line => {
                console.info(package_name, stdout_line);
            });
        }
    }
}
//# sourceMappingURL=src/monorepo_npm_check_updates_cli.js.map