@echo off
"%SMARTGIT_JAVA_HOME%\bin\java.exe" -Djava.net.preferIPv4Stack=true -cp "%SMARTGIT_CLASSPATH%" -Dsmartgit.logging=true com.syntevo.smartgit.transport.askpass.SgAskPasswordMain %*
exit 0
