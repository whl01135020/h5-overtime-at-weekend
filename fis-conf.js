fis.hook('relative');

fis.match('/js/**.js', {
    optimizer: fis.plugin('uglify-js'),
    parser: fis.plugin('babel'),
    useHash: true
});
fis.match('*.html:js', {
    optimizer: fis.plugin('uglify-js'),
    parser: fis.plugin('babel')
})
fis.match('*.less', {
    isMod: true,
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css'),
    rExt: '.css',
    postprocessor: fis.plugin('autoprefixer', {
        "browsers": ['Firefox >= 20', 'Safari >= 6', 'Explorer >= 9', 'Chrome >= 12', "ChromeAndroid >= 4.0"]
    }),
    useHash: true
});

fis.match('*.css', {
    optimizer: fis.plugin('clean-css'),
    postprocessor: fis.plugin('autoprefixer', {
        "browsers": ['Firefox >= 20', 'Safari >= 6', 'Explorer >= 9', 'Chrome >= 12', "ChromeAndroid >= 4.0"]
    }),
    useHash: true
});

fis.match('::image', {
    useHash: true
});

fis.match('*.ico', {
    useHash: false
});


//调试模式，不压缩js、css代码，方便定位问题
fis.media('dev')
    .match('*.{js,css}', {
        optimizer: null
    })
    .match('*', {
        useHash: false,
        deploy: [fis.plugin('local-deliver', {
            to: './output/'
        })]
    }).match('*.{html,js}', {
        postprocessor: function (content, file) {
            content = content.replace(/{BASEURL}/g, "");
            return content;
        }
    });

//生产模式，编译可直接应用于正式环境中
fis.media('prod').match('**', {
    relative: true,
}).match('*.{html,js}', {
    postprocessor: function (content, file) {
        content = content.replace(/{BASEURL}/g, "");
        return content;
    }
});

fis.media('test').match('**', {
    relative: true,
}).match('*.{html,js}', {
    postprocessor: function (content, file) {
        content = content.replace(/{BASEURL}/g, "");
        return content;
    }
});

//远程服务器测试模式
fis.media('localtest').match('**', {
    relative: true,
}).match('*', {
    relative: false,
    useHash: false,
    deploy: fis.plugin('local-deliver', {
        to: 'D:/Tomcat7.054/webapps/ROOT'
    })
}).match('*.html', {
    postprocessor: function (content, file) {
        content = content.replace(/{DOMAIN}/g, "");
        return content;
    }
});

//忽略编译文件
fis.set('project.ignore', [
    'output/**',
    'fis-conf.js',
    'node_modules/**',
    'package.json',
    'tmp/**',
    'src/**',
    'sonar-project.properties',
    'test.*',
    '.gitignore',
    '.eslintrc',
    '.sonar/**',
    '.git/**'
]);