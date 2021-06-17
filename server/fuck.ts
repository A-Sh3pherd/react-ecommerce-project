import axios from 'axios';
import * as fs from 'fs';
import * as Path from "path";

const route = 'https://jb.mega-school.com/content/data/profile';
const headers = {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ5MjksImlzcyI6Imh0dHBzOi8vamIubWVnYS1zY2hvb2wuY29tL2ZvcnVtL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjIzOTU2ODMwLCJleHAiOjE2MjY1NDg4MzAsIm5iZiI6MTYyMzk1NjgzMCwianRpIjoid1lwTzN6RWZKZm9aMFl5cCJ9.m2S7Prteq4eUmpAcULQfFFPOU_RwDJdkLc4nUwsIQAM'
};


(async () => {
    const promises = [];
    const studentData = JSON.parse(fs.readFileSync('students.json').toString());
    const studentsWithImages = studentData
        .filter(({profile_img}) => !!profile_img);

    promises.push(...studentsWithImages
        .map(({profile_img}) => axios.get(`${route}/${profile_img}`, {headers, responseType: 'stream'})));

    const response =  await Promise.all(promises);
    for (let i = 0; i < studentsWithImages.length; i++) {
        const student = studentsWithImages[i];
        const img = response[i];
        const path = Path.resolve(__dirname, 'images', `${student.name}.png`);
        const writer = fs.createWriteStream(path);
        img.data.pipe(writer);
    }
    console.log('DONE MADAFAKA');
})();