/**
 * 首页交互逻辑
 * 终端风格动画效果
 */

// 打字机效果函数
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 初始化首页动画
document.addEventListener('DOMContentLoaded', () => {
    // 姓名打字机效果
    const nameElement = document.getElementById('typed-name');
    if (nameElement) {
        setTimeout(() => {
            typeWriter(nameElement, 'xue hao', 100);
        }, 500);
    }

    // 命令行动画序列
    const commands = document.querySelectorAll('.command-line');
    commands.forEach((cmd, index) => {
        cmd.style.opacity = '0';
        cmd.style.transform = 'translateX(-10px)';
        cmd.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(() => {
            cmd.style.opacity = '1';
            cmd.style.transform = 'translateX(0)';
        }, 300 + index * 400);
    });

    // 输出区域渐进显示
    const outputs = document.querySelectorAll('.output');
    outputs.forEach((output, index) => {
        output.style.opacity = '0';
        setTimeout(() => {
            output.style.opacity = '1';
            output.style.transition = 'opacity 0.5s ease';
        }, 600 + index * 500);
    });

    // 技能标签动画
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
            tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 1000 + index * 100);
    });

    // 文章卡片动画
    const articleItems = document.querySelectorAll('.article-item');
    articleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.2s';
        }, 1500 + index * 200);
    });

    // 光标闪烁效果
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        cursor.style.animation = 'blink 1s infinite';
    });

    // 导航链接高亮
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 社交链接悬停效果
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = '#ffffff';
            link.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.color = '';
            link.style.textShadow = '';
        });
    });
});
