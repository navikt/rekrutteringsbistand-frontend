import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-taO6KEVb.js";import{w as m,c as D}from"./ContextDecorators-DHjn4wAt.js";import{K as b}from"./schema.zod-DHfrY-LR.js";import{u as _}from"./useKandidatlisteForEier-BNTqHfrt.js";import{F as y,A as N}from"./FullførtStilling-D7rgHjj7.js";import{R as T}from"./GjenåpneStillingKnapp-BT8L5km8.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DLEGupXo.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DTSlPuPd.js";import"./OrganisasjonsnummerAlert-BdJ4-QVF.js";import"./VStack-CD1-oXDL.js";import"./BasePrimitive-wCct1CR8.js";import"./List-rdrUQoKQ.js";import"./Link-BID-uX-a.js";import"./KandidatHendelseTag--nw917LZ.js";import"./Tag-KcS1FDyP.js";import"./FileXMark-NRkoE5MI.js";import"./Trash-mg3r6R_u.js";import"./HandShakeHeart-3-z30V7f.js";import"./Calendar-XTBIa1tH.js";import"./ThumbUp-B7amj6st.js";import"./Table-B4hRwrbQ.js";import"./util-CFkdYIk_.js";import"./format-Cht9JRki.js";import"./match-tu-LbOFz.js";import"./parseISO-BbAFDAsU.js";import"./parse-CRzCE1aA.js";import"./getDefaultOptions-DAqeGPQd.js";import"./util-BZkNEq1o.js";import"./kandidat.mock-BxbHqcsL.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DyWACjye.js";import"./index-B2L_NsKB.js";import"./index-I1K8MXyd.js";import"./index-D9qUswDI.js";import"./ChevronDown-BfqAXBTl.js";import"./Box-Ci_giH6h.js";import"./Bell-D4v0SO0g.js";import"./PersonChat-UcWFK21g.js";import"./Eye-wSLlvTuf.js";import"./ProgressBar-BHnUUc3R.js";import"./oppdaterStilling-Cqkqs5O4.js";import"./EyeSlash-C373wGIM.js";import"./CircleSlash-MHnVlXsC.js";import"./Modal-ByUBFovI.js";import"./floating-ui.react-CNy8nT8N.js";import"./Date.Input-CHvxnZPC.js";import"./useFormField-D0MUwnUw.js";import"./useControllableState-DJG1XFp3.js";import"./Modal.context-BScie5YU.js";import"./Checkbox--kGgbBAp.js";import"./Fieldset-BlvQndfZ.js";import"./Pencil-DajmJqD4.js";import"./PersonbrukerTekst-CSz55iTy.js";import"./ClockDashed-DcHu7H_c.js";import"./Tasklist-aaX2K9TS.js";import"./ErrorBoundary-CblE1zw2.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
