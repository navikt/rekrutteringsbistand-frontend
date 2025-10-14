import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-DUIlOHDN.js";import{w as m,c as D}from"./ContextDecorators-OHAgwzYd.js";import{K as b}from"./schema.zod-NSnSs8rQ.js";import{u as _}from"./useKandidatlisteForEier-XY1gbCXT.js";import{F as y,A as N}from"./FullførtStilling-BTMr3wKH.js";import{R as T}from"./GjenåpneStillingKnapp-BG8F-EvC.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DlBJLFkM.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CSTvZGsQ.js";import"./OrganisasjonsnummerAlert-B2Xt21Lw.js";import"./VStack-CP-FOnG8.js";import"./BasePrimitive-KNwMya-W.js";import"./List-yAbYG3Cj.js";import"./Link-CXpb8auh.js";import"./KandidatHendelseTag-DgDOjPoL.js";import"./Tag-BlXO3WSc.js";import"./ChatExclamationmark-Dofq3nTf.js";import"./FileXMark-CtKKNWZ1.js";import"./Trash--ke6aAVh.js";import"./HandShakeHeart-xjJ6R8dj.js";import"./Calendar-KR5O1yQo.js";import"./ThumbUp-BihwvU8r.js";import"./Table-DFVJD2Iv.js";import"./util-BILSI2V5.js";import"./format-CDfDb_lp.js";import"./match-Dp8RA4Ku.js";import"./parseISO-_TwPopcz.js";import"./parse-BGRhHba2.js";import"./getDefaultOptions-DYhQThSW.js";import"./util-kbGLNomq.js";import"./kandidat.mock-Zh-k6aY9.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DKU_fpWC.js";import"./index-DSnPW8oD.js";import"./index-7QfDLSUV.js";import"./index-BAdFHfo3.js";import"./ChevronDown-Y2lfxo4K.js";import"./Box-C6lCzARA.js";import"./Bell-Bum_JWqW.js";import"./PersonChat-B8NcpylV.js";import"./Eye-Buh9Xi59.js";import"./ProgressBar-MS00mkNW.js";import"./oppdaterStilling-DjndJwFI.js";import"./EyeSlash-DrLo1hhZ.js";import"./CircleSlash-D5ebP2Oi.js";import"./Modal-Bmkz0RZv.js";import"./floating-ui.react-DgvfWY97.js";import"./Date.Input-CLKoA6_E.js";import"./useFormField-hDMR0tco.js";import"./useControllableState-PeOYsQib.js";import"./Modal.context-Cu402-Eo.js";import"./Checkbox-C8TWY_mP.js";import"./Fieldset-BRwOVb8b.js";import"./Pencil-B0newvzj.js";import"./PersonbrukerTekst-D0RultdG.js";import"./ClockDashed-VXbYdyD-.js";import"./Tasklist-BTz9Q6Qd.js";import"./ErrorBoundary-C7W29F67.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};
