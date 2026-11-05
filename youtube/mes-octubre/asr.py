from faster_whisper import WhisperModel
import json
m=WhisperModel('/home/claude/wm/small',device='cpu',compute_type='int8')
import numpy as np
segs,_=m.transcribe(np.fromfile('voz16.raw',dtype=np.float32),language='es',word_timestamps=True,beam_size=5)
W=[[w.start,w.end,w.word] for s in segs for w in s.words]
json.dump(W,open('words.json','w'),ensure_ascii=False); print(len(W))
