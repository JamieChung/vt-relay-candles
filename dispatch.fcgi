#!/usr/bin/env python2.6
import sys, os
# Don't edit above this line!
#
# Enter your username between the quotes here...
USERNAME="vtrelayc"
# ...and your project's name here
PROJECTNAME="relay"

#
# Don't edit below this line!
#
# Add a custom Python path.
sys.path.insert(0,'/home/'+USERNAME+'/lib/python2.6/site-packages')
sys.path.insert(0, '/home/'+USERNAME+'/projects/'+PROJECTNAME)
#
# Switch to the directory of your project.
os.chdir('/home/'+USERNAME+'/projects/'+PROJECTNAME)
#
# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ['DJANGO_SETTINGS_MODULE'] = PROJECTNAME+'.settings'
from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")

