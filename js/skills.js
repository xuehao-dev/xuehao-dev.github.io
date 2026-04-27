/**
 * 技能墙页面交互逻辑
 */

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// 初始化技能墙
document.addEventListener('DOMContentLoaded', () => {
    // 命令行动画
    const commands = document.querySelectorAll('.command-line');
    commands.forEach((cmd, index) => {
        cmd.style.opacity = '0';
        cmd.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            cmd.style.opacity = '1';
            cmd.style.transform = 'translateX(0)';
            cmd.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 200 + index * 300);
    });

    // 技能分类标题动画
    const categories = document.querySelectorAll('.skill-category h3');
    categories.forEach((cat, index) => {
        cat.style.opacity = '0';
        setTimeout(() => {
            cat.style.opacity = '1';
            cat.style.transition = 'opacity 0.4s ease';
        }, 500 + index * 200);
    });

    // 技能卡片动画
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 800 + index * 100);
    });

    // 技能条渐进动画
    setTimeout(animateSkillBars, 1000);

    // 导航高亮
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 技能卡片悬停效果
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = '#6ee7b7';
            item.style.boxShadow = '0 0 15px rgba(110, 231, 183, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.borderColor = '';
            item.style.boxShadow = '';
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
