import{h as I,j as t,aM as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-BELOvKNN.js";import{w as m,c as D}from"./ContextDecorators-_PNUPAX7.js";import{K as b}from"./schema.zod-D6LN9j3W.js";import{u as _}from"./useKandidatlisteForEier-BTBUrGPp.js";import{F as y,A as N}from"./FullførtStilling-BRsbmGN7.js";import{R as T}from"./GjenåpneStillingKnapp-CM9kkaMm.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DcaAmsdZ.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CQM5FkxO.js";import"./OrganisasjonsnummerAlert-CSlWyPvV.js";import"./VStack-CVCIdyhk.js";import"./BasePrimitive-Mqp222lP.js";import"./List-DUbmPHIm.js";import"./Link-DnuL8IwU.js";import"./KandidatHendelseTag-Dye6zfEL.js";import"./Tag-Btm7kXcV.js";import"./FileXMark-6ZpgUhl2.js";import"./Trash-B9oLGwbt.js";import"./HandShakeHeart-Dp5wQ6aL.js";import"./Calendar-B9V_T85Q.js";import"./ThumbUp-yGDvx2kA.js";import"./Table-BgrymczM.js";import"./util-Dgy1Kk-2.js";import"./format-C8FmGALw.js";import"./match-D9qvYXIp.js";import"./parseISO-CZlVIeHX.js";import"./parse-CP0tnOZc.js";import"./getDefaultOptions-BpSXGg0b.js";import"./util-qK8gJWGj.js";import"./kandidat.mock-BdpnZeqe.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-D-lePqLG.js";import"./index-DKtuMMP0.js";import"./index-72k_vCqZ.js";import"./index-DpvdWnC9.js";import"./ChevronDown-CNBy5aG3.js";import"./Box-X-cwA9Lx.js";import"./Bell-BQ3MF990.js";import"./PersonChat-BwiZY6Dm.js";import"./Eye-gA3cFMVe.js";import"./ProgressBar-CzPIFuB2.js";import"./oppdaterStilling-CINYYErr.js";import"./EyeSlash-WqPR3uZL.js";import"./CircleSlash-C21GTH2U.js";import"./Modal-Bk-hnNOe.js";import"./floating-ui.react-m4wJbw6e.js";import"./Date.Input-3AqE9uYt.js";import"./useFormField-BaU1MW5p.js";import"./useControllableState-CZJeXb2k.js";import"./Modal.context-DWOAM3YB.js";import"./Checkbox-CWyfMj4U.js";import"./Fieldset-DLY4u9b_.js";import"./Pencil-BeililbL.js";import"./PersonbrukerTekst-YxydwnZ6.js";import"./ClockDashed-Cx-LmT9_.js";import"./Tasklist-3TVPocG7.js";import"./ErrorBoundary-DzHzOLTe.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
