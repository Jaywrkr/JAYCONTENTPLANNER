import json,sys
from faster_whisper import WhisperModel
m=WhisperModel('/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/wmodel/small',device='cpu',compute_type='int8',cpu_threads=8)
segs,info=m.transcribe(sys.argv[1],language='es',word_timestamps=True,vad_filter=False,beam_size=5)
W=[]
for s in segs:
  for w in s.words: W.append([round(w.start,2),round(w.end,2),w.word.strip()])
json.dump(W,open(sys.argv[2],'w'),ensure_ascii=False); print(len(W)); print(' '.join(w[2] for w in W)[:3000])
