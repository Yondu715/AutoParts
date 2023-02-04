set cpPath1=.\WEB-INF\classes
set cpPath2=%cpPath1%;C:\Portable\glassfish7\glassfish\lib\jakartaee.jar
set cpPath3=%cpPath2%;C:\Portable\glassfish7\glassfish\modules\jakarta.enterprise.cdi-api.jar
javac WEB-INF\classes\rest\builder\*.java -cp "%cpPath3%"
javac WEB-INF\classes\rest\db\repos\*.java -cp "%cpPath2%"
javac WEB-INF\classes\rest\model\*.java -cp "%cpPath2%"
javac WEB-INF\classes\rest\controller\components\*.java -cp "%cpPath2%"
javac WEB-INF\classes\rest\controller\*.java -cp "%cpPath2%"
javac WEB-INF\classes\rest\controller\interceptor\*.java -cp "%cpPath2%"

tar.exe -acf autoparts.zip .\WEB-INF
move /Y ./autoparts.zip C:\Portable\glassfish7\glassfish\domains\domain1\autodeploy\autoparts.war
pause