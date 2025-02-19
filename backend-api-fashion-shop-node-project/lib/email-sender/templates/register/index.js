const customerRegisterBody = (option) => {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác minh tài khoản</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border: 2px solid #000;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color: #000;
                color: #fff;
                padding: 20px;
                text-align: center;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 1px;
                position: relative;
            }
            .email-header .icon-container {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 10px;
            }
            .email-header .icon-container img {
                width: 100px;
                height: 100px;
                object-fit: contain;
            }
            .email-body {
                padding: 30px;
                color: #333;
                text-align: center;
            }
            .email-body h2 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            .email-body p {
                font-size: 16px;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .email-body p img {
                width: 24px;
                height: 24px;
                margin-right: 10px;
            }
            .email-button {
                display: inline-block;
                margin-top: 20px;
                padding: 15px 30px;
                font-size: 18px;
                font-weight: bold;
                background-color: #000;
                color: #fff;
                text-decoration: none;
                border-radius: 4px;
                border: 2px solid #000;
                transition: 0.3s;
            }
            .email-button:hover {
                background-color: #fff;
                color: #000;
            }
            .email-footer {
                background-color: #f4f4f4;
                padding: 15px;
                font-size: 14px;
                color: #555;
                text-align: center;
            }
            .email-footer a {
                color: #000;
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <div class="icon-container">
                    <!-- Thay đổi đường dẫn src để đặt logo của bạn -->
                    <img src="https://res.cloudinary.com/dfxrqzsay/image/upload/v1732298518/category/24fslogo.png" alt="Logo 1">
                </div>
                ĐỈNH CAO PHONG CÁCH
            </div>
            <div class="email-body">
                <h2>Xin chào ${option.name}, Quý khách sành điệu! 😎</h2>
                <p>
                    <span>🕶</span> Tài khoản của bạn vừa được thêm vào *hội những người mặc đẹp*!  
                </p>
                <p>
                    <span>🎩</span> Nhưng khoan... để vào hội, bạn cần xác minh email đã! 
                </p>
                <p>
                    <span>💼</span> Click ngay vào nút bên dưới để bước vào thế giới **thời trang xịn xò**:
                </p>
                <a  href=${process.env.STORE_URL}/verify-email/${option.token} class="email-button">Xác minh ngay</a>
            </div>
            <div class="email-footer">
                <p>
                    <span>🎓</span> Nếu bạn không yêu cầu đăng ký, cứ yên tâm, cứ ngồi uống trà nhé! ☕
                </p>
                <p>
                    Cần trợ giúp? <a href="#">Liên hệ ngay tui Kenny nah</a>.
                </p>
            </div>
        </div>
    </body>
    </html>
`;
};
module.exports = { customerRegisterBody };
