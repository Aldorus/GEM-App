const extractMainCategory = (itemElement) => {
    const typeList = itemElement.result['@type'];
    if(typeList.length <= 1) {
        return typeList.join('-');
    }
    return typeList.filter((type) => {
        return type !== 'Thing';
    }).join('-');
};

export const parseGoogleEntitySearchData = (data) => {
    if (data.itemListElement) {
        return data.itemListElement.map((itemElement) => {
            return {
                category: extractMainCategory(itemElement),
                title: itemElement.result.name,
                shortLabel: itemElement.result.description
            };
        })
    }
    return [];

    //     if (data.detailedDescription && entry.result.detailedDescription.articleBody) {
    //
    //         return <Text key={index}>{JSON.stringify(entry.result['@type'])}
    //             : {entry.result.detailedDescription.articleBody}</Text>;
    //     }
    // return <Text key={index}>{JSON.stringify(entry.result['@type'])} : {JSON.stringify(entry.result)}</Text>;
    // const data = {
    //     '@context': {
    //         '@vocab': 'http://schema.org/',
    //         'EntitySearchResult': 'goog:EntitySearchResult',
    //         'detailedDescription': 'goog:detailedDescription',
    //         'goog': 'http://schema.googleapis.com/',
    //         'kg': 'http://g.co/kg',
    //         'resultScore': 'goog:resultScore',
    //     },
    //     '@type': 'ItemList',
    //     'itemListElement': [
    //         {
    //             '@type': 'EntitySearchResult',
    //             'result': {
    //                 '@id': 'kg:/g/121qfxhg',
    //                 '@type': [
    //                     'Thing',
    //                     'Place',
    //                     'City',
    //                 ],
    //                 'description': 'City in Syria',
    //                 'detailedDescription': {
    //                     'articleBody': 'Bara or al-Bara is one of the former "Dead Cities" in northwestern Syria. It is located in the Zawiya Mountain approximately 65 kilometres north from Hama and approx. 80 km southwest from Aleppo. Al-Bara is also town in Ariha district. ',
    //                     'license': 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
    //                     'url': 'https://en.wikipedia.org/wiki/Bara,_Syria',
    //                 },
    //                 'image': {
    //                     'contentUrl': 'http://t1.gstatic.com/images?q=tbn:ANd9GcSiAcfFDvmVPnJSzj-JLR_t3y6zR6s4zAci08iNUV8FBLGgY-A8',
    //                     'license': 'http://www.gnu.org/copyleft/fdl.html',
    //                     'url': 'https://pt.wikipedia.org/wiki/Ficheiro:Bara-Ruins.jpg',
    //                 },
    //                 'name': 'Bara, Syria',
    //             },
    //             'resultScore': 32.290951,
    //         },
    //     ],
    // };
    // // 21:51:22
    // // update value Barac
    // // 21:51:23
    // // update value Barack
    // // 21:51:23
    // const data = {
    //     '@context': {
    //         '@vocab': 'http://schema.org/',
    //         'EntitySearchResult': 'goog:EntitySearchResult',
    //         'detailedDescription': 'goog:detailedDescription',
    //         'goog': 'http://schema.googleapis.com/',
    //         'kg': 'http://g.co/kg',
    //         'resultScore': 'goog:resultScore',
    //     },
    //     '@type': 'ItemList',
    //     'itemListElement': [
    //         {
    //             '@type': 'EntitySearchResult',
    //             'result': {
    //                 '@id': 'kg:/m/0k2dfsc',
    //                 '@type': [
    //                     'Person',
    //                     'Thing',
    //                 ],
    //                 'description': 'Croatian player',
    //                 'detailedDescription': {
    //                     'articleBody': 'Samir Barać is a Croatian water polo player who competed in the 2000, 2004, 2008 and 2012 Summer Olympics. As team captain, he was part of the Croatian team that won the gold medal in 2012. ',
    //                     'license': 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
    //                     'url': 'https://en.wikipedia.org/wiki/Samir_Bara%C4%87',
    //                 },
    //                 'name': 'Samir Barać',
    //             },
    //             'resultScore': 25.388237,
    //         },
    //     ],
    // };
    // const data =
    //     {
    //         '@context': {
    //             '@vocab': 'http://schema.org/',
    //             'EntitySearchResult': 'goog:EntitySearchResult',
    //             'detailedDescription': 'goog:detailedDescription',
    //             'goog': 'http://schema.googleapis.com/',
    //             'kg': 'http://g.co/kg',
    //             'resultScore': 'goog:resultScore',
    //         },
    //         '@type': 'ItemList',
    //         'itemListElement': [
    //             {
    //                 '@type': 'EntitySearchResult',
    //                 'result': {
    //                     '@id': 'kg:/m/02mjmr',
    //                     '@type': [
    //                         'Thing',
    //                         'Person',
    //                     ],
    //                     'description': '44th U.S. President',
    //                     'detailedDescription': {
    //                         'articleBody': 'Barack Hussein Obama II is an American politician who served as the 44th President of the United States from 2009 to 2017. He is the first African American to have served as president. He previously served in the U.S. ',
    //                         'license': 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
    //                         'url': 'https://en.wikipedia.org/wiki/Barack_Obama',
    //                     },
    //                     'image': {
    //                         'contentUrl': 'http://t0.gstatic.com/images?q=tbn:ANd9GcSkJEGgR2wJ0bp8DhOXx2QuexPLTslqt0v-G2iTiDWVp3iRhSnc',
    //                         'url': 'https://commons.wikimedia.org/wiki/File:BarackObama2005portrait.jpg',
    //                     },
    //                     'name': 'Barack Obama',
    //                     'url': 'http://whitehouse.gov',
    //                 },
    //                 'resultScore': 163.979904,
    //             },
    //         ],
    //     }
};