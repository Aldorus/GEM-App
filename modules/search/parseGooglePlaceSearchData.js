const extractMainCategory = (result) => {
    const typeList = result.types;
    if(typeList.length <= 1) {
        return typeList.join('');
    }
    return typeList.filter((type) => {
        return type !== 'Thing'; // TODO add filter if needed
    }).join(' - ');
};

export const parseGooglePlaceSearchData = (data) => {
    if(data.results) {
        return data.results.map((result) => {
            return {
                category: extractMainCategory(result),
                title: result.name,
                shortLabel: result.vicinity
            };
        });
    }
    return [];
    //
    //
    // const data = {
    //     'html_attributions': [],
    //     'results': [
    //         {
    //             'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    //             'id': '03ab7855bf37f901d70236de0bc537989f06adf4',
    //             'name': 'Kings Wharf Restaurant',
    //             'photos': [
    //                 {
    //                     'height': 2322,
    //                     'html_attributions': [
    //                         '<a href="https://maps.google.com/maps/contrib/106218555001370292858/photos">Peter Hopkins</a>',
    //                     ],
    //                     'photo_reference': 'CmRaAAAAzQAu2w_o7zU5AdznifgXr0tnKVm6kmR16iPv8bpheCm_czWGtBt63jrShAR-XQeX8opVVMy1NCJjxJVP9if5joeW36bEvyW1lUstCvvVubdRM2Rabhn5UhGDAqSHSibpEhAUMeJEJE_wLXXaSmFX875fGhTH9RUbS_L1GESb1JqQe83_a77iiQ',
    //                     'width': 4128,
    //                 },
    //             ],
    //             'place_id': 'ChIJpTDb6ziuEmsRb9S40gDlguQ',
    //             'reference': 'CmRSAAAAKvdQ6qG9tVqArBZozGUlQJ3XgzH-OT2tMiFB-5LqE7uktHD5lVxtyLD-m2F2V4SevB3HDwATF1wlb20GIdNaAaauII5JIrCm3u0lPRKZhw5FIpSZ_Hm7pRAh9vnngbW4EhA_iOCX_9qNv85-ESHqOG7hGhQ1EcjlmhhjhwJ6NMaHcsVGb2mPBg',
    //             'scope': 'GOOGLE',
    //             'types': [
    //                 'restaurant',
    //                 'food',
    //                 'point_of_interest',
    //                 'establishment',
    //             ],
    //             'vicinity': 'Cockle Bay, 41 Shelley St, Sydney, NSW 2000',
    //         },
    //     ],
    //     'status': 'OK',
    // }
};