## NZ amateur radio exam preparation tool

### What it is

This is a simple webapp written in ReactJS to help people prepare for the NZ amateur radio exam. Perfect for Ham Cram events or new comers to the hobby. See this live here:

[https://nzham.netlify.app](https://nzham.netlify.app)

### Motivation

- The available software for generating NZART exams is Windows only. This excludes anyone who uses a Mac or a Linux computer. Likewise, all mobile device users are excluded.
- The workflow for generating an exam and going through a test is cumbersome for an individual. The output of the software is a multi-page PDF document which makes self-evaluation a tedious task.
- I wish I had this tool when I sat for my ham exam. If it doesn't exist, we need to build it!

### Exam logic

The exam logic was coded based on the rules set out in the NZART website, which is as follows:

- At least one question from every topic
- Randomly select 1 question for every 10 questions in a topic

### Exam bank generation

All questions in the bank are in the public domain. A copy of these questions exists as text files that are available with the Windows based exam generation software – the software converts these text files into PDFs to make the official exam.

I wrote a PHP script which reads through text files and processes them into a single [JSON](src/nzart.json) file. This turned out to be a little complicated because the text files are not properly formatted and has random quirks.

The images used in the exams are available as "GIF" format files in the Windows software.

Thanks to NZART for kindly agreeing to let me use the exam questions.

### Why ReactJS?

The output is plain HTML / JavaScript / CSS files which can reside on a simple web server. There is no server-side processing required which means there is no ongoing costs or security issues. The web application runs entirely on the user's web browser.

### Found a bug? Feature requests?

Please open an issue in GitHub.
