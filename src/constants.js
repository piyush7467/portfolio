// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import sassLogo from './assets/tech_logo/sass.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import angularLogo from './assets/tech_logo/angular.png';
import reduxLogo from './assets/tech_logo/redux.png';
import nextjsLogo from './assets/tech_logo/nextjs.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import gsapLogo from './assets/tech_logo/gsap.png';
import materialuiLogo from './assets/tech_logo/materialui.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import springbootLogo from './assets/tech_logo/springboot.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import firebaseLogo from './assets/tech_logo/firebase.png';
import cLogo from './assets/tech_logo/c.png';
import cppLogo from './assets/tech_logo/cpp.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import typescriptLogo from './assets/tech_logo/typescript.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import mcLogo from './assets/tech_logo/mc.png';
import figmaLogo from './assets/tech_logo/figma.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import csharpLogo from './assets/tech_logo/csharp.png';
import kotlinLogo from './assets/tech_logo/kotlin.jpg'
import androidStudioLogo from './assets/tech_logo/android_studio.png'

// Experience Section Logo's
import webverseLogo from './assets/company_logo/webverse_logo.png';
import agcLogo from './assets/company_logo/agc_logo.png';
import newtonschoolLogo from './assets/company_logo/newtonschool_logo.png';
import mernLogo from './assets/company_logo/blog-website.png';
import FullstackLogo from './assets/company_logo/pharmacy-website.png';
import eduLogo from './assets/company_logo/edu-neocode.png';
import hackathonLogo from './assets/company_logo/hackathon.png';

// Education Section Logo's
import hpaLogo from './assets/education_logo/hpaLogo.png';
import lpuLogo from './assets/education_logo/lpuLogo.png';
// import vpsLogo from './assets/education_logo/vps_logo.png';


// Project Section Logo's
// import githubdetLogo from './assets/work_logo/github_det.png';
// import csprepLogo from './assets/work_logo/cs_prep.png';
// import movierecLogo from './assets/work_logo/movie_rec.png';
// import taskremLogo from './assets/work_logo/task_rem.png';
// import npmLogo from './assets/work_logo/npm.png';
// import webverLogo from './assets/work_logo/web_dig.png';
// import cmLogo from './assets/work_logo/cm.png';
// import imagesearchLogo from './assets/work_logo/image_search.png';
// import removebgLogo from './assets/work_logo/remove_bg.png';
import blogWebsiteLogo from './assets/work_logo/blog-website.png';
import pharmacyLogo from './assets/work_logo/pharmacy-website.png';
import eduNeocodeLogo from './assets/work_logo/edu-neocode.png';
import courseCloudLogo from './assets/work_logo/coursecloud.png';
import expenseTrackerLogo from './assets/work_logo/expense_tracker.png';


export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      // { name: 'SASS', logo: sassLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      // { name: 'Angular', logo: angularLogo },
      { name: 'Redux', logo: reduxLogo },
      // { name: 'Next JS', logo: nextjsLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
      // { name: 'GSAP', logo: gsapLogo },
      // { name: 'Material UI', logo: materialuiLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      // { name: 'Springboot', logo: springbootLogo },
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      // { name: 'Firebase', logo: firebaseLogo },
      // { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'C', logo: cLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'Java', logo: javaLogo },
      // { name: 'Python', logo: pythonLogo },
      // { name: 'C-Sharp', logo: csharpLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'Kotlin', logo: kotlinLogo },
      // { name: 'TypeScript', logo: typescriptLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo },
      { name: 'Compass', logo: mcLogo },
      { name: 'Vercel', logo: vercelLogo },
      { name: 'Android Studio', logo: androidStudioLogo },
      // { name: 'Netlify', logo: netlifyLogo },
      { name: 'Figma', logo: figmaLogo },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: mernLogo,
    role: "Fullstack Developer",
    company: "MERN Projects",
    date: "2025 - Present",
    desc: "Built multiple full-stack projects with the MERN stack, including a feature-rich blog website and a Facebook clone with real-time interactions.",
    skills: ["React JS", "Node JS", "Express", "MongoDB", "Redux", "Tailwind CSS"],
  },
  {
    id: 1,
    img: eduLogo,
    role: "Frontend Developer",
    company: "Education Website",
    date: "2024",
    desc: "Developed an educational platform providing college study materials, MCQs, and notes using HTML, CSS, and JavaScript.",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
  },
  {
    id: 2,
    img: FullstackLogo,
    role: "Fullstack Developer",
    company: "Pharmacy Website",
    date: "2025",
    desc: "Designed and implemented a pharmacy e-commerce platform with cart and order features using PHP, MySQL, Tailwind CSS, and JavaScript.",
    skills: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
  },
  {
    id: 3,
    img: hackathonLogo,
    role: "Hackathon Participant",
    company: "Code-a-Hunter",
    date: "2023",
    desc: "Participated in a hackathon, building utility projects like a To-Do app and video downloader, while collaborating in a competitive coding environment.",
    skills: ["JavaScript", "PHP", "Problem Solving", "Team Collaboration"],
  },

];


// export const experiences = [
//   {
//     id: 0,
//     img: webverseLogo,
//     role: "Fullstack Developer",
//     company: "Webverse Digital",
//     date: "April 2025 - Present",
//     desc: "Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize application performance in an agile environment.",
//     skills: [
//       "HTML",
//       "CSS",
//       "JavaScript",
//       "React JS",
//       "TypeScript",
//       "Node JS",
//       "Tailwind CSS",
//       "MongoDb",
//       "Redux",
//       " Next Js",
//     ],
//   },
//   {
//     id: 1,
//     img: agcLogo,
//     role: "Fullstack Engineer",
//     company: "Agumentik Group of Companies",
//     date: "July 2023 - March 2024",
//     desc: "Contributed to innovative projects as a Fullstack Engineer, leading both frontend and backend development using technologies such as HTML, CSS, JavaScript, PHP, SQL, Bootstrap, and ReactJS. Worked closely with the team to deliver responsive, high-performance web applications and improve user experience through seamless integration of various technologies.",
//     skills: [
//       "ReactJS",
//       "Redux",
//       "JavaScript",
//       "Tailwind CSS",
//       "HTML",
//       "CSS",
//       "SQL",
//     ],
//   },
//   {
//     id: 2,
//     img: newtonschoolLogo,
//     role: "Frontend Intern",
//     company: "Newton School",
//     date: "September 2021 - August 2022",
//     desc: "Worked as a Frontend Developer Intern, designing and implementing scalable UI components and responsive websites using HTML, CSS, JavaScript, Bootstrap, and Material UI. Collaborated with the design team to translate wireframes and prototypes from Figma into interactive, user-friendly web pages.",
//     skills: [
//       "HTML",
//       "CSS",
//       "Javascript",
//       "Bootstrap",
//       "Figma",
//       "Material UI",
//     ],
//   },
// ];

export const education = [

  {
    id: 0,
    img: lpuLogo,
    school: "Lovely Professional University, Phagwara",
    date: "Aug 2023 - Aug 2027",
    grade: "78.7%",
    desc: "I am pursuing my Bachelor's degree in Computer Science and Engineering (B.Tech.) from Lovely Professional University, Phagwara. During my studies, I have gained a strong foundation in core subjects such as Data Structures and Algorithms, Web Development, and Database Management Systems. I have also worked on several academic projects that allowed me to apply theoretical knowledge to real-world challenges, further enhancing my problem-solving and development skills.",
    degree: "Bachelor of Technology (B.Tech.) - Computer Science and Engineering",
  },

  {
    id: 1,
    img: hpaLogo,
    school: "Holy Point Academy, Bharthana, Etawah",
    date: "Apr 2021 - March 2022",
    grade: "89.8%",
    desc: "I completed my class 12 education from Holy Point Academy, Bharthana, Etawah, under the CBSE board, where I studied Physics, Chemistry, and Mathematics (PCM).",
    degree: "CBSE(XII) - PCM",
  },
  {
    id: 2,
    img: hpaLogo,
    school: "Holy Point Academy, Bharthana, Etawah",
    date: "Apr 2019 - March 2020",
    grade: "91.5%",
    desc: "I completed my class 10 education from Holy Point Academy, Bharthana, Etawah, under the CBSE board, where I studied Science with Computer.",
    degree: "CBSE(X), Science with Computer Application",
  },
];

export const projects = [
  // {
  //   id: 0,
  //   title: "GitHub Profile Detective",
  //   description:
  //     "A powerful and user-friendly React.js application designed to uncover and showcase detailed GitHub profile information. Simply enter a GitHub username, and the app fetches comprehensive data, including profile stats, repositories, followers, and contributions. The intuitive interface ensures a seamless experience, making it a must-visit tool for developers and recruiters.",
  //   image: githubdetLogo,
  //   tags: ["HTML", "CSS", "JavaScript", "React JS", "API"],
  //   github: "https://github.com/codingmastr/GitHub-Profile-Search-App-Using-React-JS",
  //   webapp: "https://githubprofiledetective.netlify.app/",
  // },
  {
    id: 1,
    title: "College Exam Prep",
    description:
      "A full-stack quiz-based platform designed for College students to practice previous year questions and practice MCQs questions. The platform offers every question detailed explanation, helping students to understand their preparation journey effectively.",
    image: eduNeocodeLogo,
    tags: ["HTML", "CSS", "JavaScript"],
    // github: "https://github.com/codingmastr/CSPrep",
    webapp: "https://neocode.in/",
  },
  {
    id: 2,
    title: "A Blog Website",
    description:
      "A Full Stack web application in which user will post blogs, see other's blogs, do comment and likes. The intuitive design and smooth experience make it a go-to app for posting blogs.",
    image: blogWebsiteLogo,
    tags: ["React JS", "API", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/piyush11234/blog",
    webapp: "https://blog-dqxu.onrender.com",
  },
  {
    id: 3,
    title: "Pharmacy Website",
    description:
      "An efficient and customizable pharmacy webbsite that offers user to book services related to body checkup. ",
    image: pharmacyLogo,
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Tailwind CSS"],
    // github: "https://github.com/codingmastr/cmtk-email-validator",
    webapp: "https://arnavhealthcare.neocode.in/",
  },
  {
    id: 4,
    title: "Course Selling Website",
    description:
      "A full-stack course selling platform where instructors can create, manage, and publish courses with lectures, while students can enroll, access learning materials, and track their progress.",
    image: courseCloudLogo,
    tags: ["React JS", "API", "HTML", "CSS", "Tailwind CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/piyush11234/coursecloud",
    webapp: "https://coursecloud.onrender.com/",
  },
  {
    id: 5,
    title: "Expense Tracker Website",
    description:
      "A full-stack expense management application that allows users to securely sign up, log in, and manage their daily expenses. Users can add, view, and delete expenses, categorize them, and track spending trends with a clean and responsive UI.",
    image: expenseTrackerLogo,
    tags: ["React JS", "API", "HTML", "CSS", "Tailwind CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/piyush11234/Expense-Tracker",
    webapp: "https://expense-tracker-daily.vercel.app/",
  }


  // {
  //   id: 4,
  //   title: "Task Reminder Chrome Extension Tool",
  //   description:
  //     "A productivity-boosting Chrome extension designed to help users manage and remember their daily tasks. Built using JavaScript, it offers a simple interface with reminders and task notifications to keep users on track.",
  //   image: taskremLogo,
  //   tags: ["JavaScript", "Chrome Extension", "HTML", "CSS"],
  //   github: "https://github.com/codingmastr/Task-Reminder-Tool",
  //   webapp: "chrome://extensions/?id=kngheeibjnnidhfoomkpnbeghackheci",
  // },
  // {
  //   id: 5,
  //   title: "Webverse Digital",
  //   description:
  //     "The official website for Webverse Digital, a creative digital marketing agency. Built using HTML, CSS, and JavaScript, it features visually appealing animations and a clean design to showcase the agency's services.",
  //   image: webverLogo,
  //   tags: ["HTML", "CSS", "JavaScript", "Framer Motion"],
  //   github: "https://github.com/codingmastr/Webverse-Digital",
  //   webapp: "https://webversedigital.com/",
  // },
  // {
  //   id: 6,
  //   title: "Coding Master",
  //   description:
  //     "An ed-tech platform where users can access tech and coding-related blogs, notes, interview questions, e-books, and premium content with payment integration. Built with full-stack technologies for a seamless learning experience.",
  //   image: cmLogo,
  //   tags: ["React JS", "Node.js", "MongoDB", "Express", "Payment Integration"],
  //   github: "https://codingmasterweb.in/",
  //   webapp: "https://codingmasterweb.in/",
  // },
  // {
  //   id: 7,
  //   title: "Image Search App",
  //   description:
  //     "A React.js-based image search application that allows users to search and download high-quality images from the web. Built using external APIs to ensure a vast library of results for various queries.",
  //   image: imagesearchLogo,
  //   tags: ["React JS", "API", "Search Feature", "CSS", "Javascript"],
  //   github: "https://github.com/codingmastr/Image-Search-App",
  //   webapp: "https://imagsearch.netlify.app/",
  // },
  // {
  //   id: 8,
  //   title: "Image Background Remover",
  //   description:
  //     "An efficient background removal app built with React.js and API integration. Users can upload any image, remove the background, and download the transparent version for further use.",
  //   image: removebgLogo,
  //   tags: ["React JS", "API", "Image Processing", "HTML", "CSS", "Javascript"],
  //   github: "https://github.com/codingmastr/Image-Background-Remover",
  //   webapp: "https://removeyourbg.netlify.app/",
  // },
];  