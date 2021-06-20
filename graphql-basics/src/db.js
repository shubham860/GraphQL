const users = [{
    id: '1',
    name: 'shubham',
    email: 'xyz@gmail.com'
},
{
    id: '2',
    name: 'ritz',
    email: 'ritz@gmail.com'
},
{
    id: '3',
    name: 'ravero',
    email: 'ravero@gmail.com'
}
];

const posts = [{
    id: '1',
    title: 'My story',
    published: true,
    author: "1",
    comment:"1"
},
{
    id: '2',
    title: 'My future',
    published: false,
    author: '2',
    comment: '2'
},
{   
    id: '3',
    title: 'My past',
    published: true,
    author: '3',
    comment: '3'
},
]


const comments = [
    {
        id: '1',
        text: "yo bad story man !!!",
        user: '1',
        post: '1'
    },
    {
        id: '2',
        text: "yo good story man !!!",
        user:'3',
        post:'3'
    },
    {
        id: '3',
        text: "yo future story man !!!",
        user:'1',
        post:'1'
    },
    {
        id: '4',
        text: "yo bad story man !!!",
        user: '3',
        post: '3'
    }
]

const db =  { users, comments, posts };
export default db;