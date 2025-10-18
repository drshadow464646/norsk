import { UploadForm } from './upload-form';

export default function UploadPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex-shrink-0 border-b p-4 pt-24">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold font-headline">Upload Document</h1>
          <p className="text-muted-foreground">
            Contribute to the archive by uploading a new document.
          </p>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="container mx-auto max-w-3xl">
          <UploadForm />
        </div>
      </main>
    </div>
  );
}
