#!/usr/bin/env node

const shell = require('shelljs');
const ArgumentParser = require('argparse').ArgumentParser;

const parser = new ArgumentParser();

parser.addArgument(['projectName']);
parser.addArgument(['-t', '--template']);

const args = parser.parseArgs();

console.log(args);

if (shell.exec(`git clone ${args.template} ${args.projectName}`).code !== 0) {
  exit();
}

shell.cd(args.projectName);
shell.rm('-rf', '.git');
shell.exec('git init');
shell.exec('git add .');
shell.exec('git commit -m "Initial Commit"');

function exit(msg) {
  if (msg) {
    shell.echo(msg);
  }

  shell.exit('1');
}
