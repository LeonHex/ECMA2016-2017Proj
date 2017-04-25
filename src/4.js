"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var xml2js = require('xml2js');
var REMAIN_NUM = 10;
var PATTERN = /main(?:-[0-9a-f]+)+.js/;
var REPO_PATH = 'E:\\publish\\test\\17zuoye\\washington-webapp\\resources\\apps\\hwh5\\homework\\V2_5_0';
function handleApp(appName) {
    return __awaiter(this, void 0, void 0, function* () {
        var appPath = path.resolve(REPO_PATH, appName);
        var jsPath = path.resolve(appPath, 'js');
        if (fs.existsSync(jsPath)) {
            appPath = jsPath;
        }
        console.log("-- path: " + appPath);
        if (!fs.existsSync(path.resolve(appPath, 'main.js'))) {
            console.log('-- no main');
            return;
        }
        process.chdir(appPath);
        var xml = yield getFilesInfoXML();
        var info = yield parseXML(xml);
        var files = filterFiles(info);
        console.log("-- found rev main files: " + files.length);
        if (files.length <= REMAIN_NUM) {
            console.log('-- not enough files, no need to delete');
            return;
        }
        var delList = files.concat();
        delList.sort(function (a, b) { return a.revision - b.revision; });
        delList.length = delList.length - REMAIN_NUM;
        yield svnDel(delList);
    });
}
function getFilesInfoXML() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            childProcess.exec('svn ls --xml', 'utf-8', function (error, stdout, stderr) {
                if (error) {
                    reject(error);
                }
                resolve(stdout);
            });
        });
    });
}
function parseXML(xml) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            xml2js.parseString(xml, {
                explicitRoot: false,
                explicitArray: false
            }, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result.list.entry);
            });
        });
    });
}
function filterFiles(files) {
    var files2 = files
        .filter(function (info) { return PATTERN.test(info.name); })
        .map(function (info) { return ({
        name: info.name,
        revision: info.commit.$.revision,
    }); });
    return files2;
}
function svnDel(files) {
    console.log('-- svn delete...');
    files.forEach(function (info) {
        childProcess.execSync("svn del " + info.name);
    });
    console.log("-- " + files.length + " files deleted");
    return;
}
function handleDir(rootPath) {
    return __awaiter(this, void 0, void 0, function* () {
        var apps = fs.readdirSync(rootPath);
        for (var i = 0, len = apps.length; i < len; i++) {
            var appName = apps[i];
            console.log("handling: " + appName + " (" + (i + 1) + "/" + len + ")");
            yield handleApp(appName);
        }
    });
}
handleDir(REPO_PATH).then(function () {
    console.log('finished');
});
//# sourceMappingURL=4.js.map