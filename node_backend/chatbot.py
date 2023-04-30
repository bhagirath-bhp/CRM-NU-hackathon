from llama_index import SimpleDirectoryReader, GPTListIndex, readers, GPTSimpleVectorIndex, LLMPredictor, PromptHelper, ServiceContext
from langchain import OpenAI
import sys
import os
from IPython.display import Markdown, display
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




def construct_index(directory_path):
    # set maximum input size
    max_input_size = 4096
    # set number of output tokens
    num_outputs = 2000
    # set maximum chunk overlap
    max_chunk_overlap = 20
    # set chunk size limit
    chunk_size_limit = 600 

    # define prompt helper
    prompt_helper = PromptHelper(max_input_size, num_outputs, max_chunk_overlap, chunk_size_limit=chunk_size_limit)

    # define LLM
    llm_predictor = LLMPredictor(llm=OpenAI(temperature=0.5, model_name="text-davinci-003", max_tokens=num_outputs))
 
    documents = SimpleDirectoryReader(directory_path).load_data()
    
    service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor, prompt_helper=prompt_helper)
    index = GPTSimpleVectorIndex.from_documents(documents, service_context=service_context)

    index.save_to_disk('index.json')

    return index

def ask_ai(qna):
    prev_communication= "previouse answers are :"
    index = GPTSimpleVectorIndex.load_from_disk('index.json')
    query = qna
    response = index.query( prev_communication + query )
    prev_communication += "\n question : {} \n answer : {}".format(query,response.response)
    sys.stdout.flush()
    return(response.response)

os.environ["OPENAI_API_KEY"] = "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"



# @app.get("/get")
# async def root():
#     # construct_index("context_data/data")
#     out=ask_ai("whats the wireless frequency ?")
#     return {"message": out}

@app.post("/q", summary="chatBot" ,tags=["crm"])
def q(data : str) -> str:
    return str(ask_ai(data))


