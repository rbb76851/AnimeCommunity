const endPoints = {
    weekTrend: {
        url: '/trending/anime?limit=5',
        method: 'get',
    },
    onAir:{
        url:'/anime?filter[status]=current&page[limit]=5&sort=-user_count',
        method: 'get',
    },
    upcoming:{
        url:'/anime?filter[status]=upcoming&page[limit]=5&sort=-user_count',
        method:'get',
    },
    rating:{
        url:'/anime?page[limit]=5&sort=-average_rating',
        method:'get',
    },
    popular:{
        url:'/anime?page[limit]=5&sort=-user_count',
        method:'get'
    }

}
export default endPoints