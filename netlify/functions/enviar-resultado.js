const { Resend } = require("resend");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

exports.handler = async function (event) {

    // Permitir somente POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: "Método não permitido."
            })
        };
    }

    try {

        // =========================
        // RECEBER DADOS DO SITE
        // =========================

        const {
            name,
            email,
            profile,
            specialty,
            secondarySpecialties
        } = JSON.parse(event.body || "{}");


        // =========================
        // VALIDAR DADOS
        // =========================

        if (
            !name ||
            !email ||
            !profile ||
            !specialty
        ) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "Dados obrigatórios não foram enviados."
                })
            };
        }


        // =========================
        // CRIAR PDF
        // =========================

        const pdfDoc = await PDFDocument.create();

        const page = pdfDoc.addPage([
            595.28,
            841.89
        ]);

        const { width, height } = page.getSize();

        const fontRegular =
            await pdfDoc.embedFont(
                StandardFonts.Helvetica
            );

        const fontBold =
            await pdfDoc.embedFont(
                StandardFonts.HelveticaBold
            );


        // =========================
        // CORES LADY CYBER
        // =========================

        const black = rgb(0.02, 0.02, 0.03);

        const darkGray = rgb(
            0.08,
            0.08,
            0.10
        );

        const pink = rgb(
            236 / 255,
            38 / 255,
            143 / 255
        );

        const white = rgb(1, 1, 1);

        const gray = rgb(
            0.72,
            0.72,
            0.76
        );


        // =========================
        // FUNDO
        // =========================

        page.drawRectangle({
            x: 0,
            y: 0,
            width,
            height,
            color: black
        });


        // =========================
        // BARRA SUPERIOR
        // =========================

        page.drawRectangle({
            x: 0,
            y: height - 8,
            width,
            height: 8,
            color: pink
        });


        // =========================
        // LADY CYBER
        // =========================

        page.drawText(
            "LADY CYBER",
            {
                x: 50,
                y: height - 70,
                size: 13,
                font: fontBold,
                color: pink
            }
        );


        // =========================
        // TÍTULO
        // =========================

        page.drawText(
            "RESULTADO DO TESTE",
            {
                x: 50,
                y: height - 115,
                size: 27,
                font: fontBold,
                color: white
            }
        );

        page.drawText(
            "DE CARREIRA CYBER",
            {
                x: 50,
                y: height - 148,
                size: 27,
                font: fontBold,
                color: white
            }
        );


        // =========================
        // NOME
        // =========================

        page.drawText(
            `Resultado de ${sanitizeText(name)}`,
            {
                x: 50,
                y: height - 190,
                size: 12,
                font: fontRegular,
                color: gray
            }
        );


        // =========================
        // LINHA
        // =========================

        page.drawRectangle({
            x: 50,
            y: height - 220,
            width: width - 100,
            height: 1,
            color: darkGray
        });


        // =========================
        // PERFIL
        // =========================

        page.drawText(
            "SEU PERFIL",
            {
                x: 50,
                y: height - 265,
                size: 11,
                font: fontBold,
                color: pink
            }
        );

        page.drawText(
            sanitizeText(profile.name),
            {
                x: 50,
                y: height - 300,
                size: 22,
                font: fontBold,
                color: white
            }
        );


        // Afinidade perfil

        page.drawText(
            `${profile.affinity}/100`,
            {
                x: 455,
                y: height - 300,
                size: 18,
                font: fontBold,
                color: pink
            }
        );

        page.drawText(
            sanitizeText(
                profile.level || ""
            ),
            {
                x: 50,
                y: height - 325,
                size: 10,
                font: fontRegular,
                color: gray
            }
        );


        // =========================
        // DESCRIÇÃO PERFIL
        // =========================

        drawWrappedText(
            page,
            sanitizeText(
                profile.description || ""
            ),
            {
                x: 50,
                y: height - 360,
                maxWidth: width - 100,
                font: fontRegular,
                size: 10,
                color: gray,
                lineHeight: 15
            }
        );


        // =========================
        // ÁREA RECOMENDADA
        // =========================

        page.drawText(
            "ÁREA RECOMENDADA",
            {
                x: 50,
                y: height - 485,
                size: 11,
                font: fontBold,
                color: pink
            }
        );

        page.drawText(
            sanitizeText(
                specialty.name
            ),
            {
                x: 50,
                y: height - 520,
                size: 20,
                font: fontBold,
                color: white
            }
        );

        page.drawText(
            `${specialty.affinity}/100`,
            {
                x: 455,
                y: height - 520,
                size: 18,
                font: fontBold,
                color: pink
            }
        );

        page.drawText(
            sanitizeText(
                specialty.level || ""
            ),
            {
                x: 50,
                y: height - 545,
                size: 10,
                font: fontRegular,
                color: gray
            }
        );


        // =========================
        // DESCRIÇÃO ESPECIALIDADE
        // =========================

        drawWrappedText(
            page,
            sanitizeText(
                specialty.description || ""
            ),
            {
                x: 50,
                y: height - 580,
                maxWidth: width - 100,
                font: fontRegular,
                size: 10,
                color: gray,
                lineHeight: 15
            }
        );


        // =========================
        // CAMINHOS PROFISSIONAIS
        // =========================

        page.drawText(
            "CAMINHOS PROFISSIONAIS",
            {
                x: 50,
                y: 165,
                size: 10,
                font: fontBold,
                color: pink
            }
        );

        const paths =
            Array.isArray(specialty.paths)
                ? specialty.paths
                : [];

        let pathY = 140;

        paths
            .slice(0, 4)
            .forEach((path) => {

                page.drawText(
                    `- ${sanitizeText(path)}`,
                    {
                        x: 50,
                        y: pathY,
                        size: 9,
                        font: fontRegular,
                        color: white
                    }
                );

                pathY -= 17;

            });


        // =========================
        // RODAPÉ
        // =========================

        page.drawText(
            "ladycyber.com.br",
            {
                x: 50,
                y: 35,
                size: 9,
                font: fontRegular,
                color: gray
            }
        );

        page.drawText(
            "LADY CYBER",
            {
                x: width - 115,
                y: 35,
                size: 9,
                font: fontBold,
                color: pink
            }
        );


        // =========================
        // SALVAR PDF
        // =========================

        const pdfBytes =
            await pdfDoc.save();

        const pdfBase64 =
            Buffer
                .from(pdfBytes)
                .toString("base64");


        // =========================
        // NOME DO ARQUIVO
        // =========================

        const safeName =
            sanitizeFileName(name);

        const fileName =
            `Resultado ${safeName} - Teste Lady Cyber.pdf`;


        // =========================
        // RESEND
        // =========================

        const resend =
            new Resend(
                process.env.RESEND_API_KEY
            );


        // =========================
        // ENVIAR E-MAIL
        // =========================

        const { data, error } =
            await resend.emails.send({

                from:
                    "Lady Cyber <resultado@send.ladycyber.com.br>",

                to: [email],

                subject:
                    `${name}, seu resultado do Teste de Carreira Cyber chegou!`,

                html: `
                    <div style="
                        background:#08080a;
                        color:#ffffff;
                        font-family:Arial,sans-serif;
                        max-width:620px;
                        margin:auto;
                        padding:40px;
                    ">

                        <div style="
                            color:#ec268f;
                            font-size:13px;
                            font-weight:bold;
                            margin-bottom:30px;
                        ">
                            LADY CYBER
                        </div>

                        <h1 style="
                            margin:0 0 20px;
                            font-size:30px;
                        ">
                            Seu resultado chegou.
                        </h1>

                        <p style="
                            color:#bdbdc5;
                            line-height:1.6;
                        ">
                            Olá,
                            <strong style="color:#ffffff;">
                                ${escapeHtml(name)}
                            </strong>.
                        </p>

                        <p style="
                            color:#bdbdc5;
                            line-height:1.6;
                        ">
                            Seu Teste de Carreira Cyber foi concluído.
                            Preparamos um PDF personalizado com o seu
                            perfil e a área de cibersegurança que mais
                            combina com suas respostas.
                        </p>

                        <div style="
                            border-left:3px solid #ec268f;
                            padding-left:20px;
                            margin:30px 0;
                        ">

                            <div style="
                                color:#999;
                                font-size:12px;
                            ">
                                SEU PERFIL
                            </div>

                            <div style="
                                font-size:20px;
                                font-weight:bold;
                                margin-top:6px;
                            ">
                                ${escapeHtml(profile.name)}
                            </div>

                            <div style="
                                color:#ec268f;
                                margin-top:5px;
                            ">
                                ${profile.affinity}/100 de afinidade
                            </div>

                        </div>

                        <div style="
                            border-left:3px solid #ec268f;
                            padding-left:20px;
                            margin:30px 0;
                        ">

                            <div style="
                                color:#999;
                                font-size:12px;
                            ">
                                ÁREA RECOMENDADA
                            </div>

                            <div style="
                                font-size:20px;
                                font-weight:bold;
                                margin-top:6px;
                            ">
                                ${escapeHtml(specialty.name)}
                            </div>

                            <div style="
                                color:#ec268f;
                                margin-top:5px;
                            ">
                                ${specialty.affinity}/100 de afinidade
                            </div>

                        </div>

                        <p style="
                            color:#bdbdc5;
                            line-height:1.6;
                            margin-top:35px;
                        ">
                            O relatório completo está anexado a este e-mail.
                        </p>

                        <hr style="
                            border:0;
                            border-top:1px solid #25252a;
                            margin:35px 0;
                        ">

                        <p style="
                            color:#888;
                            font-size:12px;
                        ">
                            Lady Cyber<br>
                            ladycyber.com.br
                        </p>

                    </div>
                `,

                attachments: [
                    {
                        filename: fileName,
                        content: pdfBase64
                    }
                ]

            });


        // =========================
        // ERRO RESEND
        // =========================

        if (error) {

            console.error(
                "Erro Resend:",
                error
            );

            return {
                statusCode: 500,
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    error:
                        "Não foi possível enviar o e-mail.",
                    details: error
                })
            };

        }


        // =========================
        // SUCESSO
        // =========================

        return {
            statusCode: 200,
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                success: true,
                id: data?.id,
                fileName
            })
        };


    } catch (error) {

        console.error(
            "Erro na função:",
            error
        );

        return {
            statusCode: 500,
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                error:
                    "Erro interno ao gerar ou enviar o resultado."
            })
        };

    }

};


// ========================================
// QUEBRAR TEXTO EM LINHAS NO PDF
// ========================================

function drawWrappedText(
    page,
    text,
    {
        x,
        y,
        maxWidth,
        font,
        size,
        color,
        lineHeight
    }
) {

    const words =
        String(text || "").split(/\s+/);

    let line = "";
    let currentY = y;

    for (const word of words) {

        const testLine =
            line
                ? `${line} ${word}`
                : word;

        const width =
            font.widthOfTextAtSize(
                testLine,
                size
            );

        if (
            width > maxWidth &&
            line
        ) {

            page.drawText(
                line,
                {
                    x,
                    y: currentY,
                    size,
                    font,
                    color
                }
            );

            line = word;

            currentY -= lineHeight;

        } else {

            line = testLine;

        }

    }

    if (line) {

        page.drawText(
            line,
            {
                x,
                y: currentY,
                size,
                font,
                color
            }
        );

    }

}


// ========================================
// TEXTO SEGURO PARA PDF
// ========================================

function sanitizeText(value) {

    return String(value || "")
        .replace(/[–—]/g, "-")
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/[\r\n]+/g, " ")
        .trim();

}


// ========================================
// NOME SEGURO PARA ARQUIVO
// ========================================

function sanitizeFileName(value) {

    return String(value || "Usuario")
        .replace(/[<>:"/\\|?*]/g, "")
        .replace(/\s+/g, " ")
        .trim();

}


// ========================================
// TEXTO SEGURO PARA HTML
// ========================================

function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}