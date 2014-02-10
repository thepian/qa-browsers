@echo off
"%SMARTGIT_JAVA_HOME%\bin\java.exe" -Djava.net.preferIPv4Stack=true -cp "%SMARTGIT_CLASSPATH%" -Dsmartgit.logging=true com.syntevo.dvcs.transport.ssh.SdSshMain %*
exit 0
