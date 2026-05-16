import argparse
import contextlib
import io
import json
import logging
import re
from pathlib import Path

from funasr import AutoModel

logging.disable(logging.WARNING)
TAG_RE = re.compile(r"<\|[^|]+\|>")


def clean_text(text: str) -> str:
    return TAG_RE.sub("", text).strip()


def main() -> None:
    parser = argparse.ArgumentParser(description="Transcribe audio with SenseVoiceSmall.")
    parser.add_argument("audio", help="Path to the audio file.")
    parser.add_argument("--json", action="store_true", help="Print raw JSON result.")
    parser.add_argument("--language", default="auto", help="Language hint, default: auto.")
    parser.add_argument("--verbose", action="store_true", help="Show model logs.")
    args = parser.parse_args()

    audio = Path(args.audio).resolve()
    if not audio.exists():
        raise FileNotFoundError(audio)

    sink = contextlib.nullcontext() if args.verbose else contextlib.redirect_stdout(io.StringIO())
    err_sink = contextlib.nullcontext() if args.verbose else contextlib.redirect_stderr(io.StringIO())
    with sink, err_sink:
        model = AutoModel(
            model="iic/SenseVoiceSmall",
            trust_remote_code=True,
            device="cpu",
            disable_update=True,
        )
        result = model.generate(
            input=str(audio),
            language=args.language,
            use_itn=True,
            batch_size_s=60,
        )

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return

    texts = [clean_text(item.get("text", "")) for item in result if item.get("text")]
    print("\n".join(t for t in texts if t))


if __name__ == "__main__":
    main()
