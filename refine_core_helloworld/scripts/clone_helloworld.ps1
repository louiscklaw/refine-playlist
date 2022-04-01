# Xcopy /E /I  helloworld restaurant_cms_helloworld

rmdir /s /q tailwind_css_helloworld_tryout
robocopy helloworld_tryout tailwind_css_helloworld_tryout /MIR /XD "node_modules"
