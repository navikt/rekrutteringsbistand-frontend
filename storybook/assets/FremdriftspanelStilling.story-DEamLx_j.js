import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-B32qNefX.js";import{w as m,c as D}from"./ContextDecorators-CGSZEHVY.js";import{K as b}from"./schema.zod-C9UJPAot.js";import{u as _}from"./useKandidatlisteForEier-C8-rKLkb.js";import{F as y,A as N}from"./FullførtStilling-BJ9hc5dw.js";import{R as T}from"./GjenåpneStillingKnapp-DeBy2pRK.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-D-1fHyGj.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DrISJs4o.js";import"./OrganisasjonsnummerAlert-DVGO9JVc.js";import"./VStack-DFkjK8C8.js";import"./BasePrimitive-CdkbGHJE.js";import"./List-CjDu2wlh.js";import"./Link-CP7bvi09.js";import"./KandidatHendelseTag-fn8eQ-M4.js";import"./Tag-PkXEKTsX.js";import"./FileXMark-DDyjaQZP.js";import"./Trash-BCQdTe5O.js";import"./HandShakeHeart-cInNHyDW.js";import"./Calendar-Bwyidtct.js";import"./ThumbUp-JhG_Nyhr.js";import"./Table-NKXcIsJo.js";import"./util-DbPJsKGZ.js";import"./format-uYcW2n3z.js";import"./match-CMgwdI-q.js";import"./parseISO-djV4R28G.js";import"./parse-Ik5otwk5.js";import"./getDefaultOptions-IbWvzyFj.js";import"./util-CBHRAVYp.js";import"./kandidat.mock-DNjOkE6g.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DUhsyP0w.js";import"./index-C6FmENJ6.js";import"./index-D1CqbyND.js";import"./index-CScKC8n4.js";import"./ChevronDown-CjecZT6b.js";import"./Box-Bq4S7LQL.js";import"./Bell-Dg2rlXbo.js";import"./PersonChat-oe7xlgKM.js";import"./Eye-DxZOeIwn.js";import"./ProgressBar-DE3bAxWi.js";import"./oppdaterStilling-B-wiGzfR.js";import"./EyeSlash-BeRzeWqj.js";import"./CircleSlash-CQg5VbRC.js";import"./Modal-DsX37BP8.js";import"./floating-ui.react-CnRFprKk.js";import"./Date.Input-X7eAZKs2.js";import"./useFormField-nToWHv09.js";import"./useControllableState--ugcGh6c.js";import"./Modal.context-CHSEilAo.js";import"./Checkbox-CpLuVBBc.js";import"./Fieldset-DyuBaFRg.js";import"./Pencil-fHopg1xT.js";import"./PersonbrukerTekst-BAeaL2Y_.js";import"./ClockDashed-DGJqQnZt.js";import"./Tasklist-BsaGliR8.js";import"./ErrorBoundary-CXYwCcKh.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
