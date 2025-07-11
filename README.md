## NZART Examination Generation System

### What it is

This is the source code for the tool which does the following:

- For students and instructors: Mock exam generator to help prepare for the exam
- For NZART exam supervisor: Printable PDF exam papers to conduct an official exam

The tool is hosted here:

[https://nzart.netlify.app](https://nzart.netlify.app)

This can also be reached through [NZART website](https://nzart.org.nz/learn/exam-generator/)

### How it is built

The tool is built using ReactJS and Vite. After pulling in the repo, run `npm install`

Please look at the file `package.json` for available commands.

The output of `npm run build` are plain HTML / JavaScript / CSS files that will be held in the dist folder.

There is no server-side processing required. The web application is static and runs entirely on the user's web browser.

### Exam logic

The exam logic was coded based on the rules set out in the NZART website, which is as follows:

- At least one question from every topic
- Randomly select 1 question for every 10 questions in a topic

### Exam bank

All questions in the bank are in the public domain. The questions are in stored in a single [JSON](src/nzart.json) file. 

The images used in the exams are available as "GIF" format files in the `src/public` folder.

### Learn about amateur radio in New Zealand

To learn more about amateur radio (ham radio) and the exam process, please visit [NZART learning site](https://nzart.org.nz/learn/)

The above link has resources such as study guides which will help you prepare for the exam.

### Found a bug? Feature requests?

Please open an issue in GitHub.
