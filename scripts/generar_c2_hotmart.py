import os
from PIL import Image, ImageDraw, ImageFont

base_dir = r"D:\Agentes de IA\Publicidad_cursos_Asincronicos"
raw_img_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\8b0315af-06ed-43c6-8108-65d60ecb88b0\c2_eett_photo_1791001331155.jpg"
logo_path = os.path.join(base_dir, "Logotipo.png")

# ==============================================================================
# 1. BANNER VERTICAL COMPLETO (1792 x 2400 - Proporción 3:4)
# ==============================================================================
def generar_banner_vertical():
    canvas = Image.new("RGB", (1792, 2400), (30, 30, 30))

    # Cargar y ajustar foto base
    bg = Image.open(raw_img_path).convert("RGB")
    bg_w, bg_h = bg.size
    target_w = 1792
    target_h = 1790
    scale = max(target_w / bg_w, target_h / bg_h)
    new_w = int(bg_w * scale)
    new_h = int(bg_h * scale)
    bg_resized = bg.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    crop_x = (new_w - target_w) // 2
    crop_y = int((new_h - target_h) * 0.25)
    bg_cropped = bg_resized.crop((crop_x, crop_y, crop_x + target_w, crop_y + target_h))
    canvas.paste(bg_cropped, (0, 0))

    # Zócalo inferior carbón (#1E1E1E)
    zócalo = Image.new("RGB", (1792, 610), (30, 30, 30))
    canvas.paste(zócalo, (0, 1790))

    # Caja blanca para logotipo en esquina superior izquierda
    white_box = Image.new("RGBA", (680, 270), (255, 255, 255, 255))
    canvas.paste(white_box, (0, 0))

    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((620, 230), Image.Resampling.LANCZOS)
        canvas.paste(logo, (35, 20), logo)

    draw = ImageDraw.Draw(canvas)

    # Badge píldora dorada encima del zócalo
    badge_text = "INCLUYE AGENTES DE IA (MS WORD READY)"
    f_badge = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 44)
    bb_b = draw.textbbox((0, 0), badge_text, font=f_badge)
    bw = bb_b[2] - bb_b[0]
    pad_x = 60
    pad_y = 16
    badge_x1 = (1792 - (bw + pad_x * 2)) // 2
    badge_y1 = 1684
    badge_x2 = badge_x1 + bw + pad_x * 2
    badge_y2 = badge_y1 + (bb_b[3] - bb_b[1]) + pad_y * 2
    draw.rounded_rectangle([badge_x1, badge_y1, badge_x2, badge_y2], radius=16, fill=(245, 158, 11), outline=(0, 0, 0), width=4)
    draw.text((badge_x1 + pad_x, badge_y1 + pad_y - 2), badge_text, fill=(0, 0, 0), font=f_badge)

    # Textos en Zócalo Inferior
    f_title = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 72)
    f_sub = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 72)
    f_hm = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 50)
    f_pr = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 76)

    linea1 = "GENERACIÓN DE EETT CON IA"
    linea2 = "AGENTES DE IA A MS WORD (.DOCX)"
    text_hm = "DISPONIBLE EN HOTMART"
    text_pr = "$15.99 USD"

    bb1 = draw.textbbox((0, 0), linea1, font=f_title)
    draw.text(((1792 - (bb1[2] - bb1[0])) // 2, 1825), linea1, fill=(255, 255, 255), font=f_title)

    bb2 = draw.textbbox((0, 0), linea2, font=f_sub)
    draw.text(((1792 - (bb2[2] - bb2[0])) // 2, 1925), linea2, fill=(245, 158, 11), font=f_sub)

    bb3 = draw.textbbox((0, 0), text_hm, font=f_hm)
    draw.text(((1792 - (bb3[2] - bb3[0])) // 2, 2065), text_hm, fill=(255, 255, 255), font=f_hm)

    bb4 = draw.textbbox((0, 0), text_pr, font=f_pr)
    draw.text(((1792 - (bb4[2] - bb4[0])) // 2, 2160), text_pr, fill=(245, 158, 11), font=f_pr)

    # Borde perimetral negro de 14px
    draw.rectangle([(0, 0), (1791, 2399)], outline=(0, 0, 0), width=14)

    # Guardar en Publicidad_cursos_Asincronicos
    out1 = os.path.join(base_dir, "C2_Generar_EETT.jpeg")
    out2 = os.path.join(base_dir, "C2_Generar EETT.jpeg")
    canvas.save(out1, "JPEG", quality=95)
    canvas.save(out2, "JPEG", quality=95)

    # Actualizar catálogo web en project-control-ai
    web_out = r"d:\Project Control AI\project-control-ai\public\cursos\C2.jpeg"
    canvas.save(web_out, "JPEG", quality=95)
    print(f"[OK] Banner vertical guardado: {out1}")
    print(f"[OK] Portada web actualizada: {web_out}")


# ==============================================================================
# 2. PORTADA CUADRADA 1:1 PARA PRODUCTO HOTMART (1200 x 1200)
# ==============================================================================
def generar_portada_hotmart_1x1():
    canvas = Image.new("RGB", (1200, 1200), (30, 30, 30))

    # Cargar y ajustar foto base (área superior: y=0 a y=880)
    bg = Image.open(raw_img_path).convert("RGB")
    bg_w, bg_h = bg.size
    target_w = 1200
    target_h = 880
    scale = max(target_w / bg_w, target_h / bg_h)
    new_w = int(bg_w * scale)
    new_h = int(bg_h * scale)
    bg_resized = bg.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    crop_x = (new_w - target_w) // 2
    crop_y = int((new_h - target_h) * 0.28)
    bg_cropped = bg_resized.crop((crop_x, crop_y, crop_x + target_w, crop_y + target_h))
    canvas.paste(bg_cropped, (0, 0))

    # Zócalo inferior carbón (320px de altura: y=880 a y=1200)
    zócalo = Image.new("RGB", (1200, 320), (30, 30, 30))
    canvas.paste(zócalo, (0, 880))

    # Caja blanca para logotipo en esquina superior izquierda
    white_box = Image.new("RGBA", (450, 180), (255, 255, 255, 255))
    canvas.paste(white_box, (0, 0))

    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((410, 150), Image.Resampling.LANCZOS)
        canvas.paste(logo, (20, 15), logo)

    draw = ImageDraw.Draw(canvas)

    # Badge píldora dorada encima del zócalo (y=825)
    badge_text = "INCLUYE AGENTES DE IA (MS WORD READY)"
    f_badge = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 28)
    bb_b = draw.textbbox((0, 0), badge_text, font=f_badge)
    bw = bb_b[2] - bb_b[0]
    pad_x = 40
    pad_y = 10
    badge_x1 = (1200 - (bw + pad_x * 2)) // 2
    badge_y1 = 825
    badge_x2 = badge_x1 + bw + pad_x * 2
    badge_y2 = badge_y1 + (bb_b[3] - bb_b[1]) + pad_y * 2
    draw.rounded_rectangle([badge_x1, badge_y1, badge_x2, badge_y2], radius=12, fill=(245, 158, 11), outline=(0, 0, 0), width=3)
    draw.text((badge_x1 + pad_x, badge_y1 + pad_y - 2), badge_text, fill=(0, 0, 0), font=f_badge)

    # Tipografía del zócalo
    f_title = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 46)
    f_sub = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 46)
    f_extra = ImageFont.truetype(r"C:\Windows\Fonts\ariblk.ttf", 40)

    linea1 = "GENERACIÓN DE EETT CON IA"
    linea2 = "AGENTES DE IA A MS WORD (.DOCX)"
    linea3 = "HOTMART · $15.99 USD"

    bb1 = draw.textbbox((0, 0), linea1, font=f_title)
    draw.text(((1200 - (bb1[2] - bb1[0])) // 2, 905), linea1, fill=(255, 255, 255), font=f_title)

    bb2 = draw.textbbox((0, 0), linea2, font=f_sub)
    draw.text(((1200 - (bb2[2] - bb2[0])) // 2, 975), linea2, fill=(245, 158, 11), font=f_sub)

    bb3 = draw.textbbox((0, 0), linea3, font=f_extra)
    draw.text(((1200 - (bb3[2] - bb3[0])) // 2, 1075), linea3, fill=(245, 158, 11), font=f_extra)

    # Borde perimetral negro de 10px
    draw.rectangle([(0, 0), (1199, 1199)], outline=(0, 0, 0), width=10)

    out_square = os.path.join(base_dir, "C2_Hotmart_Portada_1x1.jpeg")
    canvas.save(out_square, "JPEG", quality=95)
    print(f"[OK] Portada Hotmart 1:1 guardada: {out_square}")

if __name__ == "__main__":
    generar_banner_vertical()
    generar_portada_hotmart_1x1()
