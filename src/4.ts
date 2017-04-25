import * as path from 'path';
import * as fs from 'fs';
import * as childProcess from 'child_process';
import * as yargs from 'yargs';
import * as xml2js from 'xml2js';


const REMAIN_NUM = 10;
const PATTERN = /main(?:-[0-9a-f]+)+.js/;
const REPO_PATH = 'E:\\publish\\test\\17zuoye\\washington-webapp\\resources\\apps\\hwh5\\homework\\V2_5_0';


async function handleApp(appName) {
    let appPath = path.resolve(REPO_PATH, appName);

    let jsPath = path.resolve(appPath, 'js');
    if (fs.existsSync(jsPath)) {
        appPath = jsPath;
    }
    console.log(`-- path: ${appPath}`);

    if (!fs.existsSync(path.resolve(appPath, 'main.js'))) {
        console.log('-- no main');
        return;
    }

    process.chdir(appPath);

    const xml = await getFilesInfoXML();
    let info = await parseXML(xml);
    let files = filterFiles(info);

    console.log(`-- found rev main files: ${files.length}`);
    if (files.length <= REMAIN_NUM) {
        console.log('-- not enough files, no need to delete');
        return;
    }

    const delList = files.concat();
    delList.sort((a, b) => a.revision - b.revision);
    delList.length = delList.length - REMAIN_NUM;

    await svnDel(delList);
}

async function getFilesInfoXML() {
    return new Promise<string>((resolve, reject) => {
        childProcess.exec('svn ls --xml', 'utf-8', (error, stdout, stderr) => {
            if (error) { reject(error); }
            resolve(stdout);
        });
    });
}

interface SvnInfo {
    name: string;
    commit: {
        $: {
            revision: number,
        }
    }
}

interface FileInfo {
    name: string;
    revision: number;
}

async function parseXML(xml) {
    return new Promise<Array<SvnInfo>>((resolve, reject) => {
        xml2js.parseString(xml,
            {
                explicitRoot: false,
                explicitArray: false
            },
            (err, result) => {
                if (err) { reject(err); }
                resolve(result.list.entry);
            }
        );
    });
}

function filterFiles(files: Array<SvnInfo>): Array<FileInfo> {
    const files2 = files
        .filter(info => PATTERN.test(info.name))
        .map(info => ({
            name: info.name,
            revision: info.commit.$.revision,
        }));

    return files2;
}

function svnDel(files: Array<FileInfo>) {
    console.log('-- svn delete...')

    files.forEach(info => {
        childProcess.execSync(`svn del ${info.name}`);
    });

    console.log(`-- ${files.length} files deleted`);
    return;
}

async function handleDir(rootPath: string) {
    let apps = fs.readdirSync(rootPath);
    for (let i = 0, len = apps.length; i < len; i++) {
        const appName = apps[i];
        console.log(`handling: ${appName} (${i + 1}/${len})`);
        await handleApp(appName);
    }
}

handleDir(REPO_PATH).then(() => {
    console.log('finished');
});