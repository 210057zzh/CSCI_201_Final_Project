# Setting Up Spring

## How To Run Server:

Running the server requires installing Apache TomCat and linking it to Eclipse. See instructions taken from CSCI 201L Lab #1 at the bottom if required.


# Running With Maven for Quick Use:

In the Eclipse Project Explorer, right click the folder Sprout -> select "Run As" -> "Maven Build..."
In "goals", enter spring-boot:run then click the Run button.

The server will start on sprout-env.eba-vmpmw53n.us-west-1.elasticbeanstalk.com/


# Running with Spring Tools for Development:

Installing Spring Tools for Eclipse:
1. At the top, click "Help" -> "Eclipse Marketplace..."
2. Search for "Spring Tools 4 (aka Spring Tool Suite 4)..." and click Install
	a. Select the Spring Tool Suite and NOT the "Spring Tools Add-On"
3. Accept default installations and click "Confirm"
4. Accept the Licenses and click "Finish"
5. Restart Eclipse


7. In the Eclipse Project Explorer, right click the folder Sprout -> select "Run As" -> "Spring Boot App"

7. The server will start on sprout-env.eba-vmpmw53n.us-west-1.elasticbeanstalk.com/



## Installation of ApacheTomcat

# Windows Installation: 

1. Retrieve from http://tomcat.apache.org/
Under Download, select Tomcat 9
Scroll down to the 9.0.41 section. Select and download the 32-bit/64-bit
Windows Service Installer for version 9.0.41. Note the “minor” version “41”,
may change often, so use the latest version displayed on the web site.

Once the .exe is downloaded, run and install, by right-clicking on it and selecting
Open.
  a. You will be asked if you want to make changes to your device. Answer Yes.
  b. The Welcome to Apache Tomcat Setup wizard will appear. Click Next >.

  c. On the License Agreement wizard page, click on I Agree to accept the Apache License Agreement.
  d. On the Choose Components wizard page, just click Next >.
  e. On the Configuration wizard page, leave everything as is, and click Next >. Do not enter a Tomcat Administrator login.

2. On the Java Virtual Machine wizard page, you will be asked to provide the path of your jdk - make sure you know where it is. This should’ve been done in the previous lab [Environment Setup]. Click the “triple dot’ and look for something like C:\Program Files\Java\jdk-14.0.2\. Click Next >.

3. Finally, the Choose Install Location wizard page appears. Leave the estination Folder as is (C:\Program Files\Apache Software oundation\Tomcat 9.0) but make a note of it, because we will need this path later.

4. Click Install. After the files are copied, the Completing Apache Tomcat Setup wizard page appears. Click Finish.

5. Leave the first checkbox on, and Tomcat will run as a service.

6. Do not click Close! Wait until the green bar completes, and the dialog disappears. Tomcat is now running in the background.

# macOS Installation:
1. Homebrew is a package manager for macOS that enables you to install various software components and dependencies more easily. To install Homebrew, go to their website: https://brew.sh

For your convenience, I have pasted the installation command in this document. However,
they may make changes to it so if the following doesn't work, refer to Homebrew website.
Open up your Terminal and paste in:

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

2. After you've installed Homebrew, type the following into your Terminal: brew install tomcat

3. Follow the on-screen instructions and it will let you know when you're done.


We now need Install Java EE onto Eclipse, which is a plugin to support web development.
5. Launch Eclipse.
6. Select Help > Install New Software.
7. Next to “Work with” select your version of Eclipse from the dropdown, like “2020-09 – http://download.eclipse.org/releases/2020-09”.
8. In the list that loads below, select “Web, XML, Java EE and OSGi Enterprise Development.”

9. Select Next ? Next ? I accept… ? Finish.
10. The new plugin should be installed in Eclipse after a few minutes. Notice the Installing Software (%) in the bottom-right of Eclipse UI.
11. If you are asked to trust a certificate, check the box and click on Accept Selected.

13. Click Restart Now when prompted.

14. Find the Servers tab. If it is not visible, go to: Window > Perspective > Open Perspective > Other... > Web. Click Open. You should see a clickable link that asks you to “create a new server”. Click on it.

15. Next, Eclipse will ask for a server. You should see an Apache folder. Expand it to see a
bunch of sub files with different versions of Tomcat. Select Tomcat v9.0 Server and
click Next >.

16. This step is only for Windows 10. Access to the Tomcat 9.0 folder is by default restricted. Navigate, using Windows Explorer, to C:\Program Files\Apache Software
Foundation\Tomcat 9.0, and click Continue in the popup, to permanently get access to the Tomcat 9.0 folder.

13. Eclipse asks for the path to our installed version of Tomcat. Click Browse or paste the path.
  a. Windows: `C:\Program Files\Apache Software Foundation\Tomcat 9.0.`
  b. macOS: `/usr/local/Cellar/tomcat/9.0.40/libexec/`

13. Click Finish. Under the Servers tab, you should now see “Tomcat v9.0 Server at localhost.” Right click this and select Start.

## Learn More
Guides on Spring Services: https://spring.io/guides
