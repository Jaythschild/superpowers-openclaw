$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dir = 'D:\openclaw-stack\workspace\images'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
function Brush($hex){ return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex)) }
function PenC($hex,$w=1){ return New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $w }
function FontC($size,$style='Regular'){ $fs=[System.Drawing.FontStyle]::Regular; if($style -eq 'Bold'){$fs=[System.Drawing.FontStyle]::Bold}; return New-Object System.Drawing.Font -ArgumentList @('Microsoft YaHei', [single]$size, $fs, [System.Drawing.GraphicsUnit]::Pixel) }
function Text($g,$s,$x,$y,$size,$color='#111827',$style='Regular'){ $g.DrawString($s,(FontC $size $style),(Brush $color),[float]$x,[float]$y) }
function CenterText($g,$s,$x,$y,$w,$h,$size,$color='#111827',$style='Regular'){ $sf=New-Object System.Drawing.StringFormat; $sf.Alignment='Center'; $sf.LineAlignment='Center'; $rect=New-Object System.Drawing.RectangleF ([float]$x),([float]$y),([float]$w),([float]$h); $g.DrawString($s,(FontC $size $style),(Brush $color),$rect,$sf) }
function Header($g,$title,$sub){ Text $g $title 70 45 42 '#111827' 'Bold'; Text $g $sub 72 102 22 '#6B7280' }
function RRect($g,$x,$y,$w,$h,$r,$fill,$outline=$null,$lw=1){
  $gp=New-Object System.Drawing.Drawing2D.GraphicsPath; $d=$r*2
  $gp.AddArc($x,$y,$d,$d,180,90); $gp.AddArc($x+$w-$d,$y,$d,$d,270,90); $gp.AddArc($x+$w-$d,$y+$h-$d,$d,$d,0,90); $gp.AddArc($x,$y+$h-$d,$d,$d,90,90); $gp.CloseFigure()
  $g.FillPath((Brush $fill),$gp); if($outline){ $g.DrawPath((PenC $outline $lw),$gp) }; $gp.Dispose()
}
function New-Bmp($path, [scriptblock]$block){
  $bmp=New-Object System.Drawing.Bitmap 1400,900; $g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode='AntiAlias'; $g.TextRenderingHint='ClearTypeGridFit'; & $block $g; $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
}
New-Bmp (Join-Path $dir 'diagram-typography-hierarchy.png') { param($g)
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#F8FAFC')); Header $g '字体层级示例' '用字号、字重、颜色和间距建立阅读路径'
  RRect $g 70 170 580 610 28 '#FFFFFF' '#E5E7EB' 2; Text $g '年度 AI 趋势报告' 110 215 54 '#111827' 'Bold'; Text $g '核心摘要' 112 305 34 '#2563EB' 'Bold'; Text $g "生成式 AI 正在从工具转向工作流伙伴。`n标题抓眼，副标题解释价值，正文保持轻盈。" 112 365 25 '#374151'
  $items=@(@('H1 54px：第一眼看这里','#111827'),@('H2 34px：分区标题','#2563EB'),@('正文 25px：稳定阅读','#374151'),@('注释 20px：辅助信息','#6B7280'))
  for($i=0;$i -lt $items.Count;$i++){ $y=205+$i*125; $bg='#F3F4F6'; if($i -lt 2){$bg='#EFF6FF'}; RRect $g 760 $y 495 70 18 $bg; Text $g $items[$i][0] 790 ($y+18) 24 $items[$i][1] 'Bold'; $g.DrawLine((PenC '#94A3B8' 4),690,($y+35),745,($y+35)) }
}
New-Bmp (Join-Path $dir 'diagram-color-system.png') { param($g)
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#FFFBF5')); Header $g '配色系统示例' '主色负责识别，强调色负责行动，中性色负责承载信息'
  $colors=@(@('#1D4ED8',"主色 Primary`n标题 / 品牌 / 关键区",'#FFFFFF'),@('#F97316',"强调 Accent`n按钮 / 标签 / 重点提示",'#FFFFFF'),@('#111827',"深中性`n正文 / 高对比文本",'#FFFFFF'),@('#F3F4F6',"浅中性`n背景 / 分隔 / 卡片",'#111827'))
  for($i=0;$i -lt $colors.Count;$i++){ $x=90+$i*320; RRect $g $x 190 270 240 28 $colors[$i][0] '#E5E7EB' 2; CenterText $g $colors[$i][1] $x 190 270 240 25 $colors[$i][2] 'Bold'; Text $g $colors[$i][0] ($x+18) 455 24 '#374151' }
  RRect $g 120 560 500 220 24 '#FFFFFF' '#E5E7EB' 2; Text $g '好：色彩有角色' 160 600 30 '#166534' 'Bold'; Text $g "蓝色做结构，橙色只提醒重点，`n正文用深灰，背景保持安静。" 160 655 24 '#374151'
  RRect $g 780 560 500 220 24 '#FFFFFF' '#E5E7EB' 2; Text $g '避免：每个颜色都抢戏' 820 600 30 '#991B1B' 'Bold'; Text $g "主色太多会让用户不知道`n该先看哪里、点哪里。" 820 655 24 '#374151'
}
New-Bmp (Join-Path $dir 'diagram-layout-grid.png') { param($g)
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#F8FAFC')); Header $g '版式网格示例' '统一边距、列宽和留白，让页面天然整齐'
  RRect $g 110 170 1180 630 28 '#FFFFFF' '#CBD5E1' 2; $left=170; $top=230; $bottom=740; $gap=24; $cols=6; $colw=(1060-$gap*($cols-1))/$cols
  for($i=0;$i -lt $cols;$i++){ $x=$left+$i*($colw+$gap); $g.FillRectangle((Brush '#EEF2FF'),[float]$x,[float]$top,[float]$colw,[float]($bottom-$top)) }
  RRect $g 190 260 430 120 16 '#1D4ED8'; Text $g '标题区：跨 3 列' 220 302 28 '#FFFFFF' 'Bold'; RRect $g 650 260 530 120 16 '#DBEAFE'; Text $g '摘要区：跨 3 列' 680 302 28 '#1E3A8A' 'Bold'; RRect $g 190 430 330 250 16 '#F97316'; Text $g '重点卡片' 220 535 28 '#FFFFFF' 'Bold'; RRect $g 550 430 630 250 16 '#F3F4F6'; Text $g '正文/图表：跨更多列，承载复杂信息' 580 535 28 '#374151' 'Bold'; Text $g '边距统一' 120 835 22 '#64748B'; Text $g '列间距统一' 610 835 22 '#64748B'; Text $g '组件对齐' 1040 835 22 '#64748B'
}
New-Bmp (Join-Path $dir 'diagram-visual-hierarchy.png') { param($g)
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#F9FAFB')); Header $g '视觉层级示例' '先让用户看见结论，再进入证据和细节'
  $levels=@(@('1 秒','结论','#111827',1040),@('3 秒','关键证据','#2563EB',820),@('10 秒','解释与案例','#F97316',620),@('深入','数据 / 来源 / 备注','#6B7280',460))
  for($i=0;$i -lt $levels.Count;$i++){ $y=190+$i*155; $w=[int]$levels[$i][3]; $x=(1400-$w)/2; RRect $g $x $y $w 120 26 $levels[$i][2]; Text $g $levels[$i][0] ($x+42) ($y+40) 28 '#FFFFFF' 'Bold'; CenterText $g $levels[$i][1] ($x+190) $y ($w-220) 120 38 '#FFFFFF' 'Bold' }
  RRect $g 120 780 1160 70 18 '#ECFDF5' '#BBF7D0' 2; Text $g '应用：PPT、日报、海报都先写核心结论，再安排图表、案例、来源。' 160 800 25 '#166534' 'Bold'
}
Get-ChildItem $dir -Filter 'diagram-*.png' | Select-Object -ExpandProperty FullName

