
def handleEmptyAbsentKey(key ,jsonResponse):
    if key not in jsonResponse:
        return None
    else:
        return jsonResponse[key]

def getCustomObjectFromQuerrySet(querySet):
    return list(querySet)[0]
