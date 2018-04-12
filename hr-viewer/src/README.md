# Heart Rate Viewer



Brief description of what you built and what it does (1-2 paragraphs)

# Basic Setup
1. It is recommended to run the web server and database on a virtual machine. If you choose to, then connect to the vcm.
2. [Clone this repository.](https://github.com/ML273/heart_rate_databases_introduction) This is where the web server is located. 
3. After installing requirements.txt within that directory as well as setting up [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/#prerequisites), you can now run the commands on separate screens: 
  * Important Note: Edit any point with ```http://vcm-3502.vm.duke.edu``` with your vcm link.
  * For the web server: ```gunicorn --bind <vcm_site>:5000 <webservicefilename without .py>:app``` 
    Example: ```gunicorn --bind vcm-3502.vm.duke.edu:5000 hr_web_service:app```
  * For the database (remove sudo if you have admin access): ```sudo docker run -v $PWD/db:/data/db -p 27017:27017 mongo```
  * After running these two, you can ```python client.py``` which simulates a client with email "ml273@duke.edu". This can be a good reference for how to utilize the web server functions. 
4. In a separate directory, clone [this repository](https://github.com/ML273/doctor-hr-frontend.git). 
5. Install [NodeJS](https://nodejs.org/en/).
6. Within doctor-hr-frontend, ```cd hr-viewer```
7. ```npm install``` for dependencies
8. ```npm run start```
  * Important Note: Edit line 68 in GetData.js ```var url_base = "http://vcm-3502.vm.duke.edu:5000/api/heart_rate/" ``` so that the link reflects your vcm link. 

# After Set Up
The screen should look like: 
![Alternate image text](https://i.imgur.com/wBWMHkQ.png)
If you ran "client.py" from the heart_rate_databases_introduction repository, you can test to see that data shows up after typing in "ml273@duke.edu" and clicking on "GET DATA." 

