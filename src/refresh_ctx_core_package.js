import fs from 'fs';
import { promisify } from 'util';
import { each } from '@ctx-core/array';
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { keys } = Object;
import { map_package_json_path_glob } from './map_package_json_path_glob';
export async function refresh_ctx_core_package() {
    await map_package_json_path_glob(`${__dirname}/../../../**/package.json`, async (package_json) => {
        const txt = await readFile(package_json).toString();
        const in_json = JSON.parse(txt);
        const out_json = {};
        each(keys(in_json), (key) => {
            if (key === 'main') {
                out_json.main = in_json[key];
                out_json.module = in_json[key];
            }
            else if (key === 'module') {
                out_json.main = in_json[key];
                out_json.module = in_json[key];
            }
            else if (key === 'homepage') {
                out_json.homepage = in_json[key];
                out_json.publishConfig = {
                    access: 'public',
                };
            }
            else {
                out_json[key] = in_json[key];
            }
        });
        await writeFile(package_json, JSON.stringify(out_json, null, '\t'));
    });
}
//# sourceMappingURL=src/refresh_ctx_core_package.js.map