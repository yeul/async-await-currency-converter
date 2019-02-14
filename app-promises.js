const users = [{
    id: 1,
    name: 'Cassandra',
    schoolId: 0903
}, {
    id: 2,
    name: 'Dorian',
    schoolId: 0911
}];

const grades = [{
    id: 1,
    schoolId: 0903,
    grade: 95
}, {
    id: 2,
    schoolId: 0911,
    grade: 100
}, {
    id: 1,
    schoolId: 0903,
    grade: 98
}];

// get user associated with specific id that is called.

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    });
};

// return array of all grades of specified user.

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

// get a student's average in the class. ugly work-around version without async/await.

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        // average
        let average = 0;

        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        console.log(average);
        // return our string
        return `${user.name} has a ${average}% in the class.`
    });
};

// getUser(1).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e);
// });

// getGrades(0903).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//     console.log(e);
// });

// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });


// ASYNC sexample:

// const example = async (userId) => {
//     throw new Error('This is an error'); //Throwing an error = rejecting a Promise.
//     return 'Hello'; //Returning = resolving a Promise.
// };
// example().then((name) => {
//     console.log(name);
// }).catch((e) => {
//     console.log(e);
// });

// Above is the same as original Promise syntax written below:

// () => {
//     return new Promise((resolve, reject) => {
//         resolve('Hello');
//     });
// };


// ASYNC/AWAIT verion of getStatus function from line 49.

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    // average
    let average = 0;

    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    console.log(average);
    // return our string
    return `${user.name} has a ${average}% in the class.`
};

getStatusAlt(1).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});