/**
 * 博客列表页交互逻辑
 */

// 文章数据（实际项目中可从JSON文件加载）
const articles = [
    {
        id: 1,
        title: 'Spring Boot 实战：如何设计优雅的参数校验',
        date: '2026-04-20',
        views: 126,
        category: 'Spring Boot',
        tags: ['Java', 'Spring Boot', 'Validation'],
        summary: '本文介绍了如何在Spring Boot中实现优雅的参数校验，包括基础注解、自定义校验器以及全局异常处理。'
    },
    {
        id: 2,
        title: 'MySQL索引优化：从原理到实践',
        date: '2026-04-15',
        views: 89,
        category: 'MySQL',
        tags: ['MySQL', 'Performance', 'Index'],
        summary: '深入理解MySQL索引底层结构（B+树），分析慢查询原因，并给出实战优化案例。'
    },
    {
        id: 3,
        title: 'Docker Compose 编排技巧：构建开发环境',
        date: '2026-04-10',
        views: 67,
        category: 'Docker',
        tags: ['Docker', 'DevOps'],
        summary: '使用Docker Compose快速搭建本地开发环境，包括MySQL、Redis、Nginx等服务的编排。'
    },
    {
        id: 4,
        title: 'Redis 缓存避坑指南：常见问题与解决方案',
        date: '2026-04-05',
        views: 103,
        category: 'Redis',
        tags: ['Redis', 'Cache', 'Performance'],
        summary: '总结Redis使用中的常见问题：缓存穿透、缓存雪崩、缓存击穿以及对应的解决方案。'
    },
    {
        id: 5,
        title: '分布式系统设计：CAP 定理与实际应用',
        date: '2026-03-28',
        views: 156,
        category: '架构设计',
        tags: ['分布式', '架构设计', 'CAP'],
        summary: '解释CAP定理的三个特性，结合实际案例分析如何在分布式系统中做出权衡。'
    },
    {
        id: 6,
        title: 'Spring Security 实战：构建安全的认证授权系统',
        date: '2026-03-20',
        views: 78,
        category: 'Spring Boot',
        tags: ['Spring Boot', 'Security', 'JWT'],
        summary: '基于Spring Security实现JWT认证，支持OAuth2.0第三方登录。'
    }
];

// 筛选文章
function filterArticles(filter) {
    const articleList = document.getElementById('article-list');
    const articleItems = articleList.querySelectorAll('.article-item');

    articleItems.forEach((item, index) => {
        const tags = item.getAttribute('data-tags');
        const shouldShow = filter === 'all' || tags.includes(filter);

        if (shouldShow) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transition = 'opacity 0.3s ease';
            }, index * 50);
        } else {
            item.style.display = 'none';
        }
    });
}

// 初始化博客列表
document.addEventListener('DOMContentLoaded', () => {
    // 命令行动画
    const commands = document.querySelectorAll('.command-line');
    commands.forEach((cmd, index) => {
        cmd.style.opacity = '0';
        setTimeout(() => {
            cmd.style.opacity = '1';
            cmd.style.transition = 'opacity 0.3s ease';
        }, 200 + index * 300);
    });

    // 文章列表动画
    const articleItems = document.querySelectorAll('.article-item');
    articleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 600 + index * 150);
    });

    // 筛选按钮交互
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 筛选文章
            const filter = btn.getAttribute('data-filter');
            filterArticles(filter);
        });
    });

    // 导航高亮
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 文章卡片悬停效果
    articleItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderLeftColor = '#6ee7b7';
        });
        item.addEventListener('mouseleave', () => {
            item.style.borderLeftColor = '';
        });
    });

    // 社交链接效果
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = '#ffffff';
        });
        link.addEventListener('mouseleave', () => {
            link.style.color = '';
        });
    });
});
