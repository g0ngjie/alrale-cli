#!/usr/bin/env node

const util = require('./utils');
const { CustomColor } = require('./print');

/**获取emoji列表 */
exports.Emojis = function () {

    const head = [
        'emoji',
        'emoji代码',
        'commit说明'
    ]
    const tables = [
        ['🎉 [庆祝]', ':tada:', '初次提交'],
        ['🚧 [施工]', ':construction:', '工作进行中'],
        ['💄 [口红]', ':lipstick:', '更新 UI 和样式文件'],
        ['✅ [复选框]', ':white_check_mark:', '增加测试'],
        ['👌 [OK]', ':ok_hand:', '由于代码评审更改而更新代码'],
        ['🐛 [bug]', ':bug:', '修复 bug'],
        ['✏️ [铅笔]', ':pencil2:', '修理;修补'],
        ['📝 [备忘录]', ':memo:', '撰写文档'],
        ['💡 [灯泡]', ':bulb:', '在源代码中添加或更新注释'],
        ['🚀 [火箭]', ':rocket:', '部署功能'],
        ['🎨 [调色板]', ':art:', '改进代码结构/代码格式'],
        ['🔥 [火焰]', ':fire:', '移除代码或文件'],
        ['✨ [火花]', ':sparkles:', '引入新功能'],
        ['⚰️ [棺材]', ':coffin:', '删除死代码'],
        ['🔇 [静音]', ':mute:', '删除日志'],
        ['🔧 [扳手]', ':wrench:', '修改配置文件'],
        ['🥅 [目标网络]', ':goal_net:', '捕捉错误'],
        ['🔨 [锤子]', ':hammer:', '重大重构'],
        ['🛂 [护照检查]', ':passport_control:', '处理与授权、角色和权限相关的代码'],
        ['🍻 [啤酒]', ':beers:', '醉醺醺地写代码'],
        ['⏪️ [倒带]', ':rewind:', '还原更改'],
        ['📱 [iphone手机]', ':iphone:', '致力于响应性设计'],
        ['💬 [对话]', ':speech_balloon:', '添加或更新文本和文字'],
        ['🚑 [急救车]', ':ambulance:', '重要补丁'],
        ['⚡ [闪电]🐎 [赛马]', ':zap:“:racehorse:', '提升性能'],
        ['🚸 [儿童通过]', ':children_crossing:', '改善用户体验/可用性'],
        ['🔀 [向右扭曲箭头]', ':twisted_rightwards_arrows:', '合并分支'],
        ['🧐 [单眼脸]', ':monocle_face:', '数据探索/检查'],
        ['🩹 [创可贴]', ':adhesive_bandage:', '对非关键问题的简单修复'],
        ['🙈 [非礼勿视]', ':see_no_evil:', '添加或更新.gitinore文件'],
        ['🏷️ [标签]', ':label:', '添加或更新类型'],
        ['🗑️ [废纸篓]', ':wastebasket:', '弃用需要清理的代码'],
        ['🏗️ [建筑施工]', ':building_construction:', '进行架构更改'],
        ['🔊 [巨大声响]', ':loud_sound:', '添加或更新日志'],
        ['♻️ [回收]', ':recycle:', '重构代码'],
        ['📸 [相机]', ':camera_flash:', '添加或更新快照'],
        ['🚨 [警车灯]', ':rotating_light:', '移除 linter 警告'],
        ['🔒 [锁]', ':lock:', '修复安全问题'],
        ['🍎 [苹果]', ':apple:', '修复 macOS 下的问题'],
        ['🐧 [企鹅]', ':penguin:', '修复 Linux 下的问题'],
        ['🏁 [旗帜]', ':checked_flag:', '修复 Windows 下的问题'],
        ['🔖 [书签]', ':bookmark:', '发行/版本标签'],
        ['💚 [绿心]', ':green_heart:', '修复 CI 构建问题'],
        ['⬇️ [下降箭头]', ':arrow_down:', '降级依赖'],
        ['⬆️ [上升箭头]', '	:arrow_up:', '升级依赖'],
        ['👷 [工人]', ':construction_worker:', '添加 CI 构建系统'],
        ['📈 [上升趋势图]', ':chart_with_upwards_trend:', '添加分析或跟踪代码'],
        ['➖ [减号]', ':heavy_minus_sign:', '	减少一个依赖'],
        ['🐳 [鲸鱼]', ':whale:', 'Docker 相关工作'],
        ['☸️ [达摩车轮]', ':wheel_of_dharma:', 'Kubernetes 相关工作'],
        ['➕ [加号]', ':heavy_plug_sign:', '增加一个依赖'],
        ['🌐 [地球]', ':globe_with_meridians:', '国际化与本地化'],
        ['📌 [图钉]', ':pushpin:', '将依赖项固定到特定版本'],
        ['💩 [便便]', ':poop:', '编写需要改进的坏代码'],
        ['📦️ [包装]', ':package:', '添加或更新已编译的文件或包'],
        ['👽️ [外星人]', ':alien:', '由于外部API更改而更新代码'],
        ['🚚 [卡车]', ':truck:', '移动或重命名资源[例如：文件、路径、路由]'],
        ['📄 [文件]', ':page_facing_up:', '添加或更新许可证'],
        ['💥 [隆隆声]', ':boom:', '引入突破性的变化'],
        ['🍱  [便当]', ':bento:', '添加或更新资源'],
        ['♿️[轮椅]', ':wheelchair:', '提高可访问性'],
        ['🗃️ [文件盒]', ':card_file_box:', '执行与数据库相关的更改'],
        ['👥 [半身像轮廓]', ':busts_in_silhouette:', '添加或更新参与者'],
        ['🤡 [小丑]', ':clown_face:', '开玩笑'],
        ['🥚 [彩蛋]', ':egg:', '添加或更新复活节彩蛋'],
        ['⚗️ [蒸馏器]', ':alembic:', '进行实验'],
        ['🔍️ [放大镜]', ':mag:', '提高搜索引擎优化'],
        ['🌱 [幼苗]', ':seedling:', '添加或更新种子文件'],
        ['🚩 [三角旗]', ':triangular_flag_on_post:', '添加、更新或删除功能标志'],
        ['💫 [头昏眼花]', ':dizzy:', '添加或更新动画和过渡'],
    ]

    const table = util.GetTable(tables, head)
    console.log(table)
}