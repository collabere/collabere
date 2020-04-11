from project.models import Project

def getProjectsByClientId(clientId):
    return Project.objects.filter(clientId=clientId)

def getProjectsByInfluencerUserName(influencerUserName):
    return Project.objects.filter(influencerUserName=influencerUserName)

def getProjectsByInfluencerUserNameAndClientId(influencerUserName, clientId):
    return Project.objects.filter(influencerUserName=influencerUserName, clientId=clientId)

#TODO: return .first here instead of querry set array ,also remove .frst() eslewhere in views
def getProjectByProjectInitiationDate(projectInitiationDate):
    return Project.objects.filter(projectInitiationDate=projectInitiationDate)

def toggleProjectCompletetionStatus(projectInitiationDate):
    project=getProjectByProjectInitiationDate(projectInitiationDate).first()
    print(project)
    project.isCompleted=True
    project.save()
