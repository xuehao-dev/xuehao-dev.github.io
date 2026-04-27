/**
 * 文章详情页交互逻辑
 */

// 文章数据
const articles = {
    1: {
        title: 'Spring Boot 实战：如何设计优雅的参数校验',
        date: '2026-04-20',
        views: 126,
        category: 'Spring Boot',
        tags: ['Java', 'Spring Boot', 'Validation'],
        content: `
            <h2>前言</h2>
            <p>在日常开发中，参数校验是一个看似简单但却非常重要的问题。一个好的参数校验设计，不仅能让代码更加整洁，还能有效防止非法数据进入系统，提高系统的稳定性和安全性。</p>

            <h2>为什么需要参数校验？</h2>
            <ul>
                <li>防止非法数据进入系统</li>
                <li>减少不必要的数据库查询</li>
                <li>提升 API 的可用性和用户体验</li>
                <li>降低安全风险（如 SQL 注入、XSS 等）</li>
            </ul>

            <h2>基础校验注解</h2>
            <p>Spring Boot 提供了丰富的校验注解，常用的包括：</p>

            <h3>2.1 常用注解一览</h3>
            <pre><code>public class UserDTO {
    @NotNull(message = "用户名不能为空")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度必须在6-20之间")
    private String password;

    @Email(message = "邮箱格式不正确")
    private String email;

    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    @Min(value = 0, message = "年龄不能小于0")
    @Max(value = 150, message = "年龄不能大于150")
    private Integer age;
}</code></pre>

            <h3>2.2 在 Controller 中使用</h3>
            <pre><code>@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/register")
    public Result&lt;String&gt; register(@Valid @RequestBody UserDTO userDTO) {
        // 如果校验失败，会自动抛出 MethodArgumentNotValidException
        userService.register(userDTO);
        return Result.success("注册成功");
    }
}</code></pre>

            <h2>全局异常处理</h2>
            <p>当校验失败时，我们需要统一处理异常并返回友好的错误信息：</p>

            <pre><code>@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result&lt;?&gt; handleValidationException(MethodArgumentNotValidException ex) {
        StringBuilder message = new StringBuilder();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            message.append(error.getField())
                   .append(": ")
                   .append(error.getDefaultMessage())
                   .append("; ");
        }
        return Result.error(400, message.toString());
    }
}</code></pre>

            <h2>自定义校验器</h2>
            <p>有时候内置的校验注解无法满足需求，我们需要自定义校验器：</p>

            <pre><code>@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneValidator.class)
public @interface Phone {
    String message() default "手机号格式不正确";
    Class&lt;?&gt;[] groups() default {};
    Class&lt;? extends Payload&gt;[] payload() default {};
}

public class PhoneValidator implements ConstraintValidator&lt;Phone, String&gt; {
    private static final Pattern PHONE_PATTERN = Pattern.compile("^1[3-9]\\d{9}$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true; // 使用 @NotNull 来控制非空
        }
        return PHONE_PATTERN.matcher(value).matches();
    }
}</code></pre>

            <h2>分组校验</h2>
            <p>在某些场景下，同一个字段在不同操作中可能有不同的校验规则：</p>

            <pre><code>public interface AddGroup {}
public interface UpdateGroup {}

public class UserDTO {
    @NotNull(groups = UpdateGroup.class, message = "更新时ID不能为空")
    private Long id;

    @NotBlank(groups = {AddGroup.class, UpdateGroup.class}, message = "用户名不能为空")
    private String username;
}

// Controller 中指定分组
@PostMapping("/add")
public Result&lt;Void&gt; add(@Validated(AddGroup.class) @RequestBody UserDTO dto) {}

@PutMapping("/update")
public Result&lt;Void&gt; update(@Validated(UpdateGroup.class) @RequestBody UserDTO dto) {}</code></pre>

            <h2>总结</h2>
            <p>本文介绍了 Spring Boot 参数校验的完整方案，包括：</p>
            <ol>
                <li>使用内置校验注解进行基础校验</li>
                <li>通过全局异常处理统一返回错误信息</li>
                <li>自定义校验器实现特殊业务规则</li>
                <li>使用分组校验处理不同场景</li>
            </ol>
            <p>合理的参数校验设计能让代码更加健壮，也是后端开发的基本功。希望本文对你有所帮助！</p>
        `
    },
    2: {
        title: 'MySQL索引优化：从原理到实践',
        date: '2026-04-15',
        views: 89,
        category: 'MySQL',
        tags: ['MySQL', 'Performance', 'Index'],
        content: `
            <h2>前言</h2>
            <p>MySQL索引是提升查询性能的关键，但滥用索引反而会影响写入性能。本文将从索引底层原理出发，结合实际案例讲解如何正确优化索引。</p>

            <h2>索引底层结构</h2>
            <p>MySQL InnoDB引擎使用B+树作为索引底层结构，相比B树具有以下优势：</p>
            <ul>
                <li>所有数据都存储在叶子节点，查询效率更稳定</li>
                <li>叶子节点之间通过链表连接，范围查询更高效</li>
                <li>非叶子节点不存储数据，可以容纳更多索引键</li>
            </ul>

            <h2>慢查询分析</h2>
            <p>使用EXPLAIN分析查询计划：</p>
            <pre><code>EXPLAIN SELECT * FROM orders WHERE user_id = 123 AND status = 'paid';

+----+-------------+--------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
| id | select_type | table  | partitions | type | possible_keys | key         | key_len | ref   | rows | filtered | Extra |
+----+-------------+--------+------------+------+---------------+-------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | orders | NULL       | ref  | idx_user_status | idx_user_status | 450   | const |  120 |   100.00 | NULL  |
+----+-------------+--------+------------+------+---------------+-------------+---------+-------+------+----------+-------+</code></pre>

            <h2>索引优化策略</h2>
            <h3>3.1 联合索引最左前缀原则</h3>
            <p>创建联合索引 (a, b, c) 时，可以命中以下查询：</p>
            <ul>
                <li>WHERE a = ?</li>
                <li>WHERE a = ? AND b = ?</li>
                <li>WHERE a = ? AND b = ? AND c = ?</li>
            </ul>

            <h3>3.2 覆盖索引</h3>
            <p>如果查询的字段都在索引中，则不需要回表查询：</p>
            <pre><code>-- 创建覆盖索引
CREATE INDEX idx_user_cover ON orders(user_id, status, order_id);

-- 只需要扫描索引
SELECT order_id, status FROM orders WHERE user_id = 123;</code></pre>

            <h2>总结</h2>
            <p>索引优化需要根据实际查询场景来分析，遵循以下原则：</p>
            <ol>
                <li>where子句中的列优先考虑建立索引</li>
                <li>联合索引注意最左前缀原则</li>
                <li>尽量使用覆盖索引减少回表</li>
                <li>避免在索引列上使用函数</li>
            </ol>
        `
    }
    // 可以继续添加更多文章...
};

// 获取URL参数中的文章ID
function getArticleId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '1';
}

// 初始化文章详情页
document.addEventListener('DOMContentLoaded', () => {
    const articleId = getArticleId();
    const article = articles[articleId];

    if (article) {
        // 更新页面标题
        document.title = `${article.title} | 技术博客`;

        // 更新文章内容（如果有动态加载需求的话）
        // 目前文章内容直接写在HTML中，这里保留扩展性
    }

    // 命令动画效果
    const commands = document.querySelectorAll('.command-line');
    commands.forEach((cmd, index) => {
        cmd.style.opacity = '0';
        setTimeout(() => {
            cmd.style.opacity = '1';
            cmd.style.transition = 'opacity 0.3s ease';
        }, 200 + index * 200);
    });

    // 文章内容淡入
    const articleBody = document.getElementById('article-body');
    if (articleBody) {
        articleBody.style.opacity = '0';
        setTimeout(() => {
            articleBody.style.opacity = '1';
            articleBody.style.transition = 'opacity 0.5s ease';
        }, 500);
    }

    // 导航高亮
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 返回按钮悬停效果
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('mouseenter', () => {
            backBtn.style.color = '#60a5fa';
        });
        backBtn.addEventListener('mouseleave', () => {
            backBtn.style.color = '';
        });
    }

    // 代码块复制功能
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        pre.style.position = 'relative';

        // 添加复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '复制';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #333;
            border: 1px solid #555;
            color: #888;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-family: inherit;
        `;
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                copyBtn.textContent = '已复制';
                setTimeout(() => {
                    copyBtn.textContent = '复制';
                }, 2000);
            });
        });
        pre.appendChild(copyBtn);
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
