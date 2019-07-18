export const panels =  [
    {
        title: "Galleries",
        url: "galleryurl",
        blog: "Galleries",
        template: "panel1"
    },
    {
        title: "Archive photos",
        url: "galleryurl",
        blog: "Australia",
        template: "panel2"

    },
    {
        title: "All photos",
        url: "galleryurl",
        blog: "Business",
        template: "panel1"
    },
];


panels.forEach((panel) => {
    panel.feed = [
        {
            title: "cats and lego",
            date: "25th February 2019",
            images: [
                {
                    id: 'j49fj3fgsdsgdf8rj',
                    title: "Cat",
                    content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
                    publishDate: "23rd may 2000",
                    hasMedia: true,
                    url: "https://i.ytimg.com/vi/EuvTORWs244/maxresdefault.jpg"
                },
                {
                    id: 'lkiuygfyny66',
                    title: "Lego",
                    content: "Less writing for the second card",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    url: "https://weburbanist.com/wp-content/uploads/2008/10/lego_art_1.jpg"
                },
                {
                    id: 'mjghjligm',
                    title: "Guitar!",
                    content: "Less writing for the second card",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    url: "https://www.geekalerts.com/u/lego-guitar.jpg"
                }

            ]
        },
        {
            title: "Prince",
            date: "25th April 2010",
            images: [
                {
                    id: '6e5hfdghs5dt',
                    title: "Prince One",
                    content: "First image in another gallery",
                    publishDate: "23rd may 2000",
                    hasMedia: true,
                    url: "https://static.guim.co.uk/sys-images/Music/Pix/pictures/2011/6/3/1307115506503/Prince-performing-on-stag-007.jpg"
                },
                {
                    id: 'jkjjfddswyj',
                    title: "Prince Two",
                    content: "What's he been up to all these years",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    url: "http://4.bp.blogspot.com/-lqsQusSni-Q/TnvzRGHOH_I/AAAAAAAAARg/sYebBSwumX4/w1200-h630-p-k-nu/prince-hohner-telecaster.jpg"
                },
                {
                    id: 'bgdsr44',
                    title: "Prince Three",
                    content: "Lelatlalala",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    url: "https://images.uncyclomedia.co/uncyclopedia/en/thumb/d/df/Purple-Rain-Prince.jpg/400px-Purple-Rain-Prince.jpg"
                }
            ]
        },
        {
            title: "David Bowie",
            date: "25th April 2014",
            images: [
                {
                    id: 'j49fda4j38rj',
                    title: "Bowie One",
                    content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
                    publishDate: "23rd may 2000",
                    hasMedia: true,
                    url: "https://www.simpleminds.com/wp-content/uploads/2016/02/bowie.jpg"
                },
                {
                    id: 'j49fj38rj',
                    title: "Bowie Two",
                    content: "Less writing for the second card",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    url: "http://exclaim.ca/images/up-4bowie.jpg"
                },
                {
                    id: 'fsdbfht',
                    title: "Bowie Three",
                    content: "Less writing for the second card",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    url: "http://img2-ak.lst.fm/i/u/arO/b35700b21cb147e280097ff6ec5e43e7"
                }

            ]
        }
    ]
});