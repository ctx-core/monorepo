import { _queue } from '@ctx-core/queue';
import { projects_ } from './projects_';
import { promise_a_ } from './promise_a_';
import { exec } from './exec';
import { stdout_h_package_name_ } from './stdout_h_package_name_';
export async function run_parallel_workspaces(cmd_a, opts = {}) {
    const queue = _queue(opts.threads || 20);
    const projects = await projects_();
    const cmd = cmd_a.join(' ');
    const package_name_a = projects.map(project => project.package_name);
    const promise_a = promise_a_(projects, _promise);
    const stdout_a = await Promise.all(promise_a);
    return stdout_h_package_name_(package_name_a, stdout_a);
    async function _promise(project) {
        const { package_dir } = project;
        return (await queue.add(async () => (await exec(`cd ${package_dir}; ${cmd}`)).stdout.trim()));
    }
}
//# sourceMappingURL=src/run_parallel_workspaces.js.map