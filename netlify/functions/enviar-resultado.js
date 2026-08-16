"use strict";

const { Resend } = require("resend");
const {
    PDFDocument,
    StandardFonts,
    rgb
} = require("pdf-lib");


/* =========================================================
   LADY CYBER
   NETLIFY FUNCTION
   GERAR PDF + ENVIAR RESULTADO POR E-MAIL
========================================================= */

exports.handler = async function (event) {

    /* =====================================================
       PERMITIR SOMENTE POST
    ===================================================== */

    if (event.httpMethod !== "POST") {

        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                error: "Método não permitido."
            })
        };

    }


    try {

        /* =================================================
           RECEBER DADOS DO TESTE
        ================================================= */

        const body = JSON.parse(
            event.body || "{}"
        );

        const {
            name,
            email,
            profile,
            specialty,
            secondarySpecialties = []
        } = body;


        /* =================================================
           VALIDAR DADOS OBRIGATÓRIOS
        ================================================= */

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
                    success: false,
                    error:
                        "Dados obrigatórios não foram enviados."
                })
            };

        }


        if (
            !process.env.RESEND_API_KEY
        ) {

            console.error(
                "RESEND_API_KEY não encontrada."
            );

            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    error:
                        "A chave de envio de e-mail não está configurada."
                })
            };

        }


        /* =================================================
           CRIAR PDF
        ================================================= */

        const pdfDoc =
            await PDFDocument.create();


        const page =
            pdfDoc.addPage([
                595.28,
                841.89
            ]);


        const {
            width,
            height
        } = page.getSize();


        /* =================================================
           FONTES
        ================================================= */

        const fontRegular =
            await pdfDoc.embedFont(
                StandardFonts.Helvetica
            );


        const fontBold =
            await pdfDoc.embedFont(
                StandardFonts.HelveticaBold
            );


        /* =================================================
           CORES LADY CYBER
        ================================================= */

        const black =
            rgb(
                0.02,
                0.02,
                0.03
            );


        const dark =
            rgb(
                0.07,
                0.07,
                0.09
            );


        const darkBorder =
            rgb(
                0.16,
                0.16,
                0.19
            );


        const pink =
            rgb(
                236 / 255,
                38 / 255,
                143 / 255
            );


        const white =
            rgb(
                1,
                1,
                1
            );


        const gray =
            rgb(
                0.72,
                0.72,
                0.76
            );


        const lightGray =
            rgb(
                0.88,
                0.88,
                0.90
            );


        /* =================================================
           FUNDO
        ================================================= */

        page.drawRectangle({
            x: 0,
            y: 0,
            width: width,
            height: height,
            color: black
        });


        /* =================================================
           BARRA SUPERIOR
        ================================================= */

        page.drawRectangle({
            x: 0,
            y: height - 7,
            width: width,
            height: 7,
            color: pink
        });


        /* =================================================
           CABEÇALHO
        ================================================= */

        page.drawText(
            "LADY CYBER",
            {
                x: 48,
                y: height - 55,
                size: 12,
                font: fontBold,
                color: pink
            }
        );


        page.drawText(
            "RESULTADO DO TESTE",
            {
                x: 48,
                y: height - 100,
                size: 26,
                font: fontBold,
                color: white
            }
        );


        page.drawText(
            "DE CARREIRA CYBER",
            {
                x: 48,
                y: height - 132,
                size: 26,
                font: fontBold,
                color: white
            }
        );


        page.drawText(
            `Resultado de ${sanitizeText(name)}`,
            {
                x: 48,
                y: height - 166,
                size: 11,
                font: fontRegular,
                color: gray
            }
        );


        /* =================================================
           DIVISÓRIA
        ================================================= */

        page.drawRectangle({
            x: 48,
            y: height - 193,
            width: width - 96,
            height: 1,
            color: darkBorder
        });


        /* =================================================
           BLOCO PERFIL
        ================================================= */

        page.drawRectangle({
            x: 48,
            y: height - 390,
            width: width - 96,
            height: 165,
            color: dark
        });


        page.drawText(
            "SEU PERFIL",
            {
                x: 66,
                y: height - 252,
                size: 10,
                font: fontBold,
                color: pink
            }
        );


        page.drawText(
            sanitizeText(
                profile.name || ""
            ),
            {
                x: 66,
                y: height - 282,
                size: 21,
                font: fontBold,
                color: white
            }
        );


        page.drawText(
            `${safeNumber(profile.affinity)}/100`,
            {
                x: width - 125,
                y: height - 282,
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
                x: 66,
                y: height - 305,
                size: 10,
                font: fontRegular,
                color: lightGray
            }
        );


        drawWrappedText(
            page,
            sanitizeText(
                profile.description || ""
            ),
            {
                x: 66,
                y: height - 332,
                maxWidth: width - 132,
                font: fontRegular,
                size: 9.5,
                color: gray,
                lineHeight: 14,
                maxLines: 4
            }
        );


        /* =================================================
           BLOCO ESPECIALIDADE
        ================================================= */

        page.drawRectangle({
            x: 48,
            y: height - 610,
            width: width - 96,
            height: 185,
            color: dark
        });


        page.drawText(
            "ÁREA RECOMENDADA",
            {
                x: 66,
                y: height - 453,
                size: 10,
                font: fontBold,
                color: pink
            }
        );


        drawWrappedText(
            page,
            sanitizeText(
                specialty.name || ""
            ),
            {
                x: 66,
                y: height - 485,
                maxWidth: 365,
                font: fontBold,
                size: 18,
                color: white,
                lineHeight: 22,
                maxLines: 2
            }
        );


        page.drawText(
            `${safeNumber(
                specialty.affinity
            )}/100`,
            {
                x: width - 125,
                y: height - 485,
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
                x: 66,
                y: height - 527,
                size: 10,
                font: fontRegular,
                color: lightGray
            }
        );


        drawWrappedText(
            page,
            sanitizeText(
                specialty.description || ""
            ),
            {
                x: 66,
                y: height - 553,
                maxWidth: width - 132,
                font: fontRegular,
                size: 9.5,
                color: gray,
                lineHeight: 14,
                maxLines: 4
            }
        );


        /* =================================================
           CAMINHOS PROFISSIONAIS
        ================================================= */

        page.drawText(
            "CAMINHOS PROFISSIONAIS",
            {
                x: 48,
                y: 190,
                size: 10,
                font: fontBold,
                color: pink
            }
        );


        const paths =
            Array.isArray(
                specialty.paths
            )
                ? specialty.paths
                : [];


        let pathY = 164;


        paths
            .slice(0, 5)
            .forEach(
                (path) => {

                    page.drawText(
                        `• ${sanitizeText(path)}`,
                        {
                            x: 58,
                            y: pathY,
                            size: 9.5,
                            font: fontRegular,
                            color: white
                        }
                    );

                    pathY -= 18;

                }
            );


        /* =================================================
           OUTRAS ÁREAS COMPATÍVEIS
        ================================================= */

        if (
            Array.isArray(
                secondarySpecialties
            ) &&
            secondarySpecialties.length > 0
        ) {

            page.drawText(
                "OUTRAS ÁREAS COMPATÍVEIS",
                {
                    x: 315,
                    y: 190,
                    size: 10,
                    font: fontBold,
                    color: pink
                }
            );


            let secondaryY = 164;


            secondarySpecialties
                .slice(0, 2)
                .forEach(
                    (item) => {

                        const title =
                            sanitizeText(
                                item.name ||
                                item.specialtyName ||
                                item.key ||
                                "Área compatível"
                            );


                        page.drawText(
                            title,
                            {
                                x: 315,
                                y: secondaryY,
                                size: 9,
                                font: fontBold,
                                color: white
                            }
                        );


                        if (
                            item.affinity !==
                            undefined
                        ) {

                            page.drawText(
                                `${safeNumber(
                                    item.affinity
                                )}/100`,
                                {
                                    x: 490,
                                    y: secondaryY,
                                    size: 9,
                                    font: fontBold,
                                    color: pink
                                }
                            );

                        }


                        secondaryY -= 24;

                    }
                );

        }


        /* =================================================
           RODAPÉ
        ================================================= */

        page.drawRectangle({
            x: 48,
            y: 55,
            width: width - 96,
            height: 1,
            color: darkBorder
        });


        page.drawText(
            "ladycyber.com.br",
            {
                x: 48,
                y: 32,
                size: 8.5,
                font: fontRegular,
                color: gray
            }
        );


        page.drawText(
            "LADY CYBER",
            {
                x: width - 105,
                y: 32,
                size: 8.5,
                font: fontBold,
                color: pink
            }
        );


        /* =================================================
           GERAR PDF
        ================================================= */

        const pdfBytes =
            await pdfDoc.save();


        const pdfBuffer =
            Buffer.from(
                pdfBytes
            );


        /* =================================================
           NOME DO ARQUIVO
        ================================================= */

        const safeName =
            sanitizeFileName(
                name
            );


        const fileName =
            `Resultado ${safeName} - Teste Lady Cyber.pdf`;


        /* =================================================
           CONFIGURAR RESEND
        ================================================= */

        const resend =
            new Resend(
                process.env.RESEND_API_KEY
            );


        /* =================================================
           ENVIAR E-MAIL
        ================================================= */

        const {
            data,
            error
        } =
            await resend.emails.send({

                from:
                    "Lady Cyber <resultado@ladycyber.com.br>",

                to: [
                    email
                ],

                subject:
                    `${sanitizeEmailText(
                        name
                    )}, seu resultado do Teste de Carreira Cyber chegou!`,

                html: `
                    <div
                        style="
                            margin:0;
                            padding:0;
                            background:#08080a;
                            font-family:Arial,sans-serif;
                            color:#ffffff;
                        "
                    >

                        <div
                            style="
                                max-width:620px;
                                margin:0 auto;
                                padding:40px 30px;
                            "
                        >

                            <div
                                style="
                                    color:#ec268f;
                                    font-size:13px;
                                    font-weight:700;
                                    letter-spacing:1px;
                                    margin-bottom:28px;
                                "
                            >
                                LADY CYBER
                            </div>


                            <h1
                                style="
                                    color:#ffffff;
                                    font-size:30px;
                                    line-height:1.2;
                                    margin:0 0 24px;
                                "
                            >
                                Seu resultado chegou.
                            </h1>


                            <p
                                style="
                                    color:#c5c5cb;
                                    font-size:15px;
                                    line-height:1.7;
                                "
                            >
                                Olá,
                                <strong
                                    style="
                                        color:#ffffff;
                                    "
                                >
                                    ${escapeHtml(name)}
                                </strong>.
                            </p>


                            <p
                                style="
                                    color:#c5c5cb;
                                    font-size:15px;
                                    line-height:1.7;
                                "
                            >
                                Seu Teste de Carreira Cyber
                                foi concluído.

                                Preparamos um relatório em PDF
                                com o seu perfil e a área de
                                cibersegurança que mais combina
                                com suas respostas.
                            </p>


                            <div
                                style="
                                    margin:30px 0;
                                    padding:18px 20px;
                                    border:1px solid #29292d;
                                    border-left:3px solid #ec268f;
                                    background:#101012;
                                "
                            >

                                <div
                                    style="
                                        color:#9d9da4;
                                        font-size:11px;
                                        margin-bottom:8px;
                                    "
                                >
                                    SEU PERFIL
                                </div>


                                <div
                                    style="
                                        color:#ffffff;
                                        font-size:20px;
                                        font-weight:700;
                                    "
                                >
                                    ${escapeHtml(
                                        profile.name || ""
                                    )}
                                </div>


                                <div
                                    style="
                                        color:#ec268f;
                                        font-size:14px;
                                        margin-top:8px;
                                    "
                                >
                                    ${safeNumber(
                                        profile.affinity
                                    )}/100
                                </div>

                            </div>


                            <div
                                style="
                                    margin:30px 0;
                                    padding:18px 20px;
                                    border:1px solid #29292d;
                                    border-left:3px solid #ec268f;
                                    background:#101012;
                                "
                            >

                                <div
                                    style="
                                        color:#9d9da4;
                                        font-size:11px;
                                        margin-bottom:8px;
                                    "
                                >
                                    ÁREA RECOMENDADA
                                </div>


                                <div
                                    style="
                                        color:#ffffff;
                                        font-size:20px;
                                        font-weight:700;
                                    "
                                >
                                    ${escapeHtml(
                                        specialty.name || ""
                                    )}
                                </div>


                                <div
                                    style="
                                        color:#ec268f;
                                        font-size:14px;
                                        margin-top:8px;
                                    "
                                >
                                    ${safeNumber(
                                        specialty.affinity
                                    )}/100
                                </div>

                            </div>


                            <p
                                style="
                                    color:#c5c5cb;
                                    font-size:15px;
                                    line-height:1.7;
                                "
                            >
                                O relatório completo está
                                anexado a este e-mail.
                            </p>


                            <hr
                                style="
                                    border:0;
                                    border-top:1px solid #29292d;
                                    margin:36px 0;
                                "
                            >


                            <p
                                style="
                                    color:#8e8e95;
                                    font-size:12px;
                                    line-height:1.6;
                                "
                            >
                                Lady Cyber<br>
                                ladycyber.com.br
                            </p>

                        </div>

                    </div>
                `,

                attachments: [
                    {
                        filename:
                            fileName,

                        content:
                            pdfBuffer
                    }
                ]

            });


        /* =================================================
           TRATAR ERRO DO RESEND
        ================================================= */

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
                    success: false,
                    error:
                        "Não foi possível enviar o e-mail.",
                    details:
                        error
                })
            };

        }


        /* =================================================
           SUCESSO
        ================================================= */

        console.log(
            "Resultado enviado com sucesso:",
            {
                email:
                    email,
                fileName:
                    fileName,
                resendId:
                    data?.id
            }
        );


        return {
            statusCode: 200,
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                success: true,
                message:
                    "Resultado enviado com sucesso.",
                id:
                    data?.id,
                fileName:
                    fileName
            })
        };


    } catch (error) {

        /* =================================================
           ERRO GERAL
        ================================================= */

        console.error(
            "Erro na função enviar-resultado:",
            error
        );


        return {
            statusCode: 500,
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                success: false,
                error:
                    "Erro interno ao gerar ou enviar o resultado."
            })
        };

    }

};


/* =========================================================
   QUEBRAR TEXTO NO PDF
========================================================= */

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
        lineHeight,
        maxLines = 100
    }
) {

    const words =
        String(
            text || ""
        )
            .split(/\s+/)
            .filter(Boolean);


    let line =
        "";


    let currentY =
        y;


    let lineCount =
        0;


    for (
        const word
        of words
    ) {

        const testLine =
            line
                ? `${line} ${word}`
                : word;


        const textWidth =
            font.widthOfTextAtSize(
                testLine,
                size
            );


        if (
            textWidth >
                maxWidth &&
            line
        ) {

            page.drawText(
                line,
                {
                    x:
                        x,
                    y:
                        currentY,
                    size:
                        size,
                    font:
                        font,
                    color:
                        color
                }
            );


            currentY -=
                lineHeight;


            lineCount++;


            if (
                lineCount >=
                maxLines
            ) {

                return;

            }


            line =
                word;

        } else {

            line =
                testLine;

        }

    }


    if (
        line &&
        lineCount <
            maxLines
    ) {

        page.drawText(
            line,
            {
                x:
                    x,
                y:
                    currentY,
                size:
                    size,
                font:
                    font,
                color:
                    color
            }
        );

    }

}


/* =========================================================
   SANITIZAR TEXTO PARA PDF
========================================================= */

function sanitizeText(
    value
) {

    return String(
        value || ""
    )
        .replace(
            /[–—]/g,
            "-"
        )
        .replace(
            /[“”]/g,
            '"'
        )
        .replace(
            /[‘’]/g,
            "'"
        )
        .replace(
            /[\r\n]+/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


/* =========================================================
   SANITIZAR NOME DO ARQUIVO
========================================================= */

function sanitizeFileName(
    value
) {

    const name =
        String(
            value ||
            "Usuario"
        )
            .replace(
                /[<>:"/\\|?*]/g,
                ""
            )
            .replace(
                /\s+/g,
                " "
            )
            .trim();


    return (
        name ||
        "Usuario"
    );

}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escapeHtml(
    value
) {

    return String(
        value || ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   TEXTO SEGURO PARA ASSUNTO DO E-MAIL
========================================================= */

function sanitizeEmailText(
    value
) {

    return String(
        value || ""
    )
        .replace(
            /[\r\n]+/g,
            " "
        )
        .trim();

}


/* =========================================================
   GARANTIR NÚMERO VÁLIDO
========================================================= */

function safeNumber(
    value
) {

    const number =
        Number(
            value
        );


    if (
        Number.isNaN(
            number
        )
    ) {

        return 0;

    }


    return Math.max(
        0,
        Math.min(
            100,
            Math.round(
                number
            )
        )
    );

}